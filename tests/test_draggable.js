module("draggable", {
	setup: function() {
		$("#fsortable").fsortable();
		$("#items .item").draggable({
			connectToSortable: "#fsortable",
			helper: "clone"
		});
	}
});
test("test_drag_item_to_first_slot", function() {
	dd("#items .item:first", "#fsortable .fsortable-empty:first");
	testfsortable("#fsortable", [6, null, null, null, null]);
});

test("test_drag_item_to_last_slot", function() {
	dd("#items .item:first", "#fsortable .fsortable-empty:last");
	testfsortable("#fsortable", [null, null, null, null, 6]);
});

test("test_drag_item_to_first_slot_and_drop_outside", function() {
	var from = "#items .item:first",
			to = "#fsortable .fsortable-empty:first";

	var fromOffset = findCenter($(from)),
			toOffset = findCenter($(to));

	$(from).simulate("mousedown", fromOffset);
	$(document).simulate("mousemove", toOffset);
	toOffset.clientY += 50;
	$(document).simulate("mousemove", toOffset);
	$(from).simulate("mouseup", toOffset);
	$(from).simulate("click", toOffset);
	testfsortable("#fsortable", [null, null, null, null, null]);
});

test("test_drag_item_to_last_slot_and_drop_outside", function() {
	var from = "#items .item:first",
			to = "#fsortable .fsortable-empty:last";

	var fromOffset = findCenter($(from)),
			toOffset = findCenter($(to));

	$(from).simulate("mousedown", fromOffset);
	$(document).simulate("mousemove", toOffset);
	toOffset.clientY += 50;
	$(document).simulate("mousemove", toOffset);
	$(from).simulate("mouseup", toOffset);
	$(from).simulate("click", toOffset);
	testfsortable("#fsortable", [null, null, null, null, null]);
});

test("test_drag_item_to_first_slot_then_outside_then_back_to_first", function() {
	var from = "#items .item:first",
			to = "#fsortable .fsortable-empty:first";

	var fromOffset = findCenter($(from)),
			toOffset = findCenter($(to));

	$(from).simulate("mousedown", fromOffset);
	$(document).simulate("mousemove", toOffset);
	toOffset.clientY += 50;
	$(document).simulate("mousemove", toOffset);
	toOffset.clientY -= 51;
	$(document).simulate("mousemove", toOffset);
	$(from).simulate("mouseup", toOffset);
	$(from).simulate("click", toOffset);
	testfsortable("#fsortable", [6, null, null, null, null]);
});

test("test_drag_over_first_occupied_slot", function() {
	dd("#items .item:first", "#fsortable .fsortable-empty:first");
	dd("#items .item:first", "#fsortable .fsortable-empty:first");
	testfsortable("#fsortable", [6, 6, null, null, null]);
});

test("test_drag_over_last_occupied_slot", function() {
	dd("#items .item:first", "#fsortable .fsortable-empty:last");
	dd("#items .item:first", "#fsortable .fsortable-empty:last");
	testfsortable("#fsortable", [null, null, null, 6, 6]);
});

test("test_drag_till_full", function() {
	for (var i = 0; i < 5; i++) {
		dd("#items .item:first", "#fsortable .fsortable-empty:first");
	}
	testfsortable("#fsortable", [6, 6, 6, 6, 6]);
});

