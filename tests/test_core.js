module("core");
test("test_create", function() {
	ok($("#fsortable").fsortable().hasClass("fsortable"));
	ok($("#fsortable").sortable("instance"));
	ok(!$("#fsortable").hasClass("full"), "doesn't have full class");
});

test("test_destroy", function() {
	ok(!$("#fsortable").fsortable().fsortable("destroy").hasClass("fsortable"));
	ok(!$("#fsortable").fsortable("instance"));
	ok(!$("#fsortable").sortable("instance"));
	ok(!$("#fsortable").hasClass("full"), "doesn't have full class");
});

test("test_destroy_full", function() {
	ok(!$("#fsortable3").fsortable().fsortable("destroy").hasClass("fsortable"));
	ok(!$("#fsortable3").hasClass("full"), "doesn't have full class");
});

test("test_size_empty", function() {
	$("#fsortable").fsortable();
	equal($("#fsortable").fsortable("size"), 5, "size is correct");
	equal($("#fsortable").fsortable("capacity"), 5, "capacity is correct");
	equal($("#fsortable").fsortable("occupied"), 0, "occupied is correct");
	ok(!$("#fsortable").hasClass("full"), "doesn't have full class");
});

test("test_size_full", function() {
	$("#fsortable3").fsortable();
	equal($("#fsortable3").fsortable("size"), 5, "size is correct");
	equal($("#fsortable3").fsortable("capacity"), 0, "capacity is correct");
	equal($("#fsortable3").fsortable("occupied"), 5, "occupied is correct");
	ok($("#fsortable3").hasClass("full"), "has full class");
});

test("test_size_partial", function() {
	$("#fsortable div").slice(3).remove();
	var i = $("<div></div>").text("test");
	i.clone().appendTo("#fsortable");
	i.clone().appendTo("#fsortable");

	$("#fsortable").fsortable();
	equal($("#fsortable").fsortable("size"), 5, "size is correct");
	equal($("#fsortable").fsortable("capacity"), 3, "capacity is correct");
	equal($("#fsortable").fsortable("occupied"), 2, "occupied is correct");
	ok(!$("#fsortable").hasClass("full"), "doesn't have full class");
});

test("test_drag_empty_slot", function() {
	var startCount = 0;

	$("#fsortable").fsortable();
	$("#fsortable").on("sortstart", function() {
		startCount++;
	});

	$("#fsortable .fsortable-empty:first").simulate("drag", {dx: 50});
	equal(startCount, 0, "nothing dragged");
});

test("test_existing_sortable", function() {
	$("#fsortable").sortable({cancel: ".test"}).fsortable({existingSortable: true});
	equal($("#fsortable").sortable("option", "cancel"), ".test, .fsortable-empty");
});

