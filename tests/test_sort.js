module("sort");
test("test_sort_first_to_last", function() {
	$("#fsortable3").fsortable();

	dd("#fsortable3 .item:first", "#fsortable3 .item:last", 1, 1);
	testfsortable("#fsortable3", [2, 3, 4, 5, 1]);
});

test("test_sort_last_to_first", function() {
	$("#fsortable3").fsortable();

	dd("#fsortable3 .item:last", "#fsortable3 .item:first", -1, -1);
	testfsortable("#fsortable3", [5, 1, 2, 3, 4]);
});

