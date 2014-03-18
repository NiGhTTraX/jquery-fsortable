/**
 * Copyright (c) 2014 Andrei Picus
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */


$.widget("ntx.fsortable", $.ui.sortable, {
	options: {
		emptyClass: "fsortable-empty",
		existingSortable: false
	},

	_refresh: function() {
		/**
		 * Get the total size of the fsortable and the number of occupied
		 * and free slots.
		 */

		var freeSlots = $("." + this.options.emptyClass, this.element),
				items = $(this.options.items, this.element).not(freeSlots);

		this._occupied = items.length;
		this._capacity = freeSlots.length;
		this._size = this._occupied + this._capacity;

		if (!this._capacity) {
			this.element.addClass("full");
		} else {
			this.element.removeClass("full");
		}
	},

	_getFreeSpot: function(ui) {
		/**
		 * Return the free spot closest to the placeholder, or the last free spot in
		 * case there is no placeholder
		 *
		 * Returns:
		 *	a jQuery object representing the free spot, if there is one.
		 *	null if there is no free slot.
		 */

		var closest;

		if (!ui || !ui.placeholder[0]) {
			// If we have no placeholder, get the last empty slot.
			closest = $("." + this.options.emptyClass + ":last", this.element);
		} else {
			// Get the empty slot closest to the placeholder.
			closest = ui.placeholder.nextAll("." + this.options.emptyClass + ":first");
			if (!closest.length) {
				closest = ui.placeholder.prevAll("." + this.options.emptyClass + ":first");
			}
		}

		if (closest.length) {
			return closest;
		}

		// No empty slots.
		return null;
	},

	_removeFreeSpot: function(_inst) {
		var inst = _inst || this;
		inst._spot.remove();
		inst._spot = null;
		inst.element.sortable("refresh");

		// Update the capacities.
		inst._capacity--;
		inst._occupied++;

		if (inst._capacity === 0) {
			inst.element.addClass("full");
		}
	},

	_create: function() {
		var that = this;

		this.element.addClass("fsortable");

		// Prevent sorting on empty slots.
		// Make sure to not overwrite existing options.
		if (!this.options.existingSortable) {
			this.options.cancel += ", ." + this.options.emptyClass;

			// Initialize new sortable plugin passing in all options.
			this.element.sortable(this.options);
		} else {
			this.options.cancel = this.element.sortable("option", "cancel");
			this.options.cancel += ", ." + this.options.emptyClass;

			// Pass our options to existing sortable.
			this.element.sortable("option", this.options);
		}

		this._refresh();

		this._outside = false;
		this._connected = false;

		// Bind special listeners.
		this.element.on("sortactivate", function(e, ui) {
			/**
			 * This event is triggered on all connected sortables when dragging starts
			 * in one of them (this includes connected draggables).
			 *
			 * We're only interested if the event fired on anything other than us.
			 */

			if (!ui.sender || ui.sender[0] !== this) {
				that._outside = true;
			}
		});

		this.element.on("sortdeactivate", function() {
			that._outside = false;

			/**
			 * If we got the deactivate signal and didn't remove the free spot,
			 * it means the item dropped outside of us so we have to restore the
			 * spot that we've hidden earlier.
			 *
			 * Now, because the sortable plugin is so well written, there's 2
			 * situations when this can happen:
			 *   1. A draggable came over us then left and dropped.
			 *   2. An item that we owned went over a connected sortable then
			 *      came back to us and dropped.
			 *
			 * In the first case, we must restore the spot. In the second case,
			 * we must remove the spot.
			 */
			if (that._spot) {
				if (that._connected) {
					// The item bame back to us, remove the spot.
					that._spot.remove();

					// Don't forget to update capacities.
					that._capacity--;
					that._occupied++;
				} else {
					// The item dropped outside, show the spot.
					that._spot.show();
				}

				that._spot = null;
			}

			that._connected = false;
		});

		this.element.on("sortover", function(e, ui) {
			/**
			 * If we're receiving a new item we need to remove a free spot. We
			 * don't actually remove it now because we'd have to call
			 * 'refresh' on the sortable and that messes things up during
			 * sorting.
			 *
			 * Instead, we hide the spot and remove it when sorting stops.
			 * We only hide it when the sortable actually changes, so as
			 * to not hide slots needlessly.
			 */

			// If we've already hidden a free spot, don't do it again.
			if (that._spot) {
				return;
			}

			if (that._outside === true) {
					that._spot = that._getFreeSpot(ui);

					// TODO: if _spot is null, bad stuff has happened, throw an error?
					// or figure out how to gracefully cancel a sort

				$(this).one("sortchange.fs", function() {
					that._spot.hide();
				});
			}
		});

		this.element.on("sortreceive", function() {
			// If we need to remove a free spot, do it now and refresh the sortable.
			if (that._spot) {
				that._removeFreeSpot();
			}
		});

		this.element.on("sortout", function(e, ui) {
			/**
			 * If preparing to exit the sortable, remember the last position of the
			 * placeholder so we know where to create the empty spot, if necessary.
			 */
			// Deactivate some listeners because they're not needed anymore.
			// Use namespaces so we don't unbind every listener.
			$(this).off("sortchange.fs");

			that.previous = ui.placeholder.next();
			if (!that.previous.length) {
				that.previous = null;
			}
		});

		$(document).on("sortover", ".ui-sortable", function(e, ui) {
			/**
			 * We need to know when an item leaves our list and enters another so we
			 * can replace it with an empty slot. To do this we listen for the
			 * sortover event which fires whenever an item is dragged over a sortable.
			 * The ui argument will contain the sortable list from which it came so we
			 * check if it's equal to us.
			 *
			 * The over event is also fired right after the start event, when picking
			 * up an item to drag, in which case the sender is equal to the list. In
			 * this case we check if the event triggered on us.
			 *
			 * Checking only one of the above is not enough.
			 */

			// Ignore if the event triggered on us.
			if (this === that.element[0]) return;

			// Ignore if the item didn't come from us.
			if (!ui.sender || ui.sender[0] !== that.element[0]) return;

			var inst = ui.sender.data(that.widgetFullName),
					o = $("<div></div>").addClass(that.options.emptyClass);

			if (!inst.previous) {
				o.appendTo(inst.element);
			} else {
				o.insertBefore(inst.previous);
			}

			// Refresh the sortable.
			//inst.refresh();
			ui.sender.sortable("refresh");

			// Update capacities.
			inst._capacity++;
			inst._occupied--;

			// Prepare the sender in case the item returns to them.
			inst._outside = true;
			inst._connected = true;
			if (inst._spot) {
				inst._spot.remove();
				inst._spot = null;
			}

			inst.element.removeClass("full");
		});
	},

	_destroy: function() {
		this.element.removeClass("fsortable full");
		if (!this.options.existingSortable) {
			this.element.sortable("destroy");
		}
	},

	refresh: function() {
		this._refresh();
		this.element.sortable("refresh");
	},

	size: function() {
		return this._size;
	},

	capacity: function() {
		return this._capacity;
	},

	occupied: function() {
		return this._occupied;
	}
});

