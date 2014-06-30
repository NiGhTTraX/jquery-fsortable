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

  $(".fs").on("sortupdate", function() {
      $(this).attr("data-content", $(this).fsortable("capacity"));
  }).each(function() {
      // Set the initial value of the attribute.
      $(this).attr("data-content", $(this).find(".fsortable-empty").length);
  });
});

