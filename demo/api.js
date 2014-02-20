$(document).ready(function() {
		$("#wavy1").wavy({
				size: 8,
				path: ["arc", 150, 150, 150, 0, 360]
		});

		$(".item").draggable({
			revert: "invalid",
			helper: "clone",
		}).bind("dblclick", function() {
			$("#wavy1").wavy("addItem", $(this).clone(), $("#index").val());
		});

		$("#path").change(function() {
			$("#wavy1").wavy("destroy");

			if ($(this).val() == "line")
				path = ["line", 0, 0, 300, 300];
			else if ($(this).val() == "arc")
				path = ["arc", 150, 150, 150, 0, 360];
			else if ($(this).val() == "bezier")
				path = ["bezier", 0, 0, 300, 300, 50, 250, 250, 50];

			$("#wavy1").wavy({
					size: 8,
					path: path
			});
		});

		$("#remove").click(function() {
			$("#wavy1").wavy("removeItem", $("#index").val());
		});

		$("#add").click(function() {
			var item = $("<div></div>").text("X").addClass("item");
			$("#wavy1").wavy("addItem", item, $("#index").val());
		});

		$("#trash").droppable({
				drop: function(e, ui) {
						// Get the section and index from the helper.
						var section = ui.helper.data("section");
						var index = ui.helper.data("index");

						// Remove the original item.
						ui.helper.parent().parent().wavy("removeItem", section, index);

						// Remove the helper.
						ui.helper.remove();
				}
		});
});

