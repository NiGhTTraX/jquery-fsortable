$(document).ready(function() {
	$(".fs").fsortable({
		connectWith: ".fs",
		tolerance: "pointer",
		size: 5
	}).disableSelection();

	$("#content .item").draggable({
		connectToSortable: ".fs:not(.full)",
		revert: "invalid",
		helper: "clone"
	});
});

