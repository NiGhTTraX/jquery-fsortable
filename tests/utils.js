/* jslint unused: false */
function findCenter(elem) {
	var offset,
			document = $(elem[0].ownerDocument);
	offset = elem.offset();

	return {
			clientX: offset.left + elem.outerWidth() / 2 - document.scrollLeft(),
			clientY: offset.top + elem.outerHeight() / 2 - document.scrollTop()
	};
}

function dd(from, to, _dx, _dy, _moves) {
	// Drag and drop from -> to.
	var fromOffset = findCenter($(from)),
			toOffset = findCenter($(to)),
			dx = toOffset.clientX - fromOffset.clientX + (_dx || 0),
			dy = toOffset.clientY - fromOffset.clientY + (_dy || 0),
			moves = _moves || 50;

	$(from).simulate("drag", {
		dx: dx - 1,
		dy: dy - 1,
		moves: moves
	});
}

function testfsortable(fs, els) {
	var size = els.length,
			capacity = 0,
			occupied = 0;

	equal($(fs).children().length, els.length, "correct number of elements");

	$(fs).children().each(function(i) {
		if (els[i]) {
			occupied++;
			ok(!$(this).hasClass("fsortable-empty"), "slot " + i + " is not empty");
			equal($(this).text(), els[i], "slot " + i + " has correct content");
		} else {
			capacity++;
			ok($(this).hasClass("fsortable-empty"), "slot " + i + " is empty");
		}
	});

	equal($(fs).fsortable("size"), size, "size is corrrect");
	equal($(fs).fsortable("capacity"), capacity, "capacity is correct");
	equal($(fs).fsortable("occupied"), occupied, "occupied is correct");
	if (!capacity) {
		ok($(fs).hasClass("full"), "is full");
	} else {
		ok(!$(fs).hasClass("full"), "is not full");
	}
}
/* jslint unused: true */

