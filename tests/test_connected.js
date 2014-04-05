module("connected", {
	setup: function() {
		$("#fsortable, #fsortable2").fsortable({
			connectWith: "#fsortable, #fsortable2"
		});
		$("#items .item").draggable({
			connectToSortable: "#fsortable, #fsortable2",
			helper: "clone"
		});
	}
});
test("test_first_to_first", function() {
	dd("#fsortable2 .item:first", "#fsortable .fsortable-empty:first");
	testfsortable("#fsortable", [1, null, null, null, null]);
	testfsortable("#fsortable2", [null, null, null, null, 2]);
});

test("test_first_to_last", function() {
	// Use drag offset because of sortable bug.
	dd("#fsortable2 .item:first", "#fsortable .fsortable-empty:last", 60, 0);
	testfsortable("#fsortable", [null, null, null, null, 1]);
	testfsortable("#fsortable2", [null, null, null, null, 2]);
});

test("test_last_to_first", function() {
	dd("#fsortable2 .item:last", "#fsortable .fsortable-empty:first");
	testfsortable("#fsortable", [2, null, null, null, null]);
	testfsortable("#fsortable2", [1, null, null, null, null]);
});

test("test_last_to_last", function() {
	dd("#fsortable2 .item:last", "#fsortable .fsortable-empty:last");
	testfsortable("#fsortable", [null, null, null, null, 2]);
	testfsortable("#fsortable2", [1, null, null, null, null]);
});

test("test_over_connected_then_out_then_back_over", function() {
	var from = "#fsortable2 .item:first",
			to = "#fsortable .fsortable-empty:first";

	var fromOffset = findCenter($(from)),
			toOffset = findCenter($(to));

	$(from).simulate("mousedown", fromOffset);
	$(document).simulate("mousemove", toOffset);
	toOffset.clientY += 500;
	$(document).simulate("mousemove", toOffset);
	toOffset.clientY -= 501;
	$(document).simulate("mousemove", toOffset);
	$(from).simulate("mouseup", toOffset);
	$(from).simulate("click", toOffset);

	testfsortable("#fsortable", [1, null, null, null, null]);
	testfsortable("#fsortable2", [null, null, null, null, 2]);
});

test("test_over_connected_then_back", function() {
	var from = "#fsortable2 .item:first",
			to = "#fsortable .fsortable-empty:first";

	var fromOffset = findCenter($(from)),
			toOffset = findCenter($(to));

	$(from).simulate("mousedown", fromOffset);
	$(document).simulate("mousemove", toOffset);
	// Use offset due to sortable bug.
	fromOffset.clientX += 10;
	$(document).simulate("mousemove", fromOffset);
	$(from).simulate("mouseup", fromOffset);
	$(from).simulate("click", fromOffset);

	testfsortable("#fsortable", [null, null, null, null, null]);
	testfsortable("#fsortable2", [1, null, null, null, 2]);
});

test("test_stress_drag_connected", function() {
	var from = "#fsortable2 .item:first",
			to = "#fsortable .fsortable-empty:first";

	var fromOffset = findCenter($(from)),
			toOffset = findCenter($(to)),
			toOffset_back = toOffset;

	var steps = 20;

	$(from).simulate("mousedown", fromOffset);
	$(document).simulate("mousemove", toOffset);

	for (var i = 0; i < steps; i++) {
		$(document).simulate("mousemove", fromOffset);
		$(document).simulate("mousemove", toOffset);
	}

	$(from).simulate("mouseup", toOffset);
	$(from).simulate("click", toOffset);
	testfsortable("#fsortable", [1, null, null, null, null]);
	testfsortable("#fsortable2", [null, null, null, null, 2]);
});

