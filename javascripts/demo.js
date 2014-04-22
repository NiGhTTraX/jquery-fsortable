$(document).ready(function() {
	$(".fs").fsortable({
		connectWith: ".fs:not(.full)",
		tolerance: "pointer",
		helper: "clone",
		appendTo: "body",
	}).disableSelection();

	$("#content .item").draggable({
		connectToSortable: ".fs:not(.full)",
		revert: "invalid",
		helper: "clone"
	});
});

