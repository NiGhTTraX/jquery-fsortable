$(document).ready(function() {
		$("#wavy1").wavy({
				rotate: true,
				path: [["arc", 8, 150, 150, 150, 0, 360]]
		});

		$("#wavy2").wavy({
				rotate: true,
				path: [["bezier", 8, 0, 0, 300, 300, 50, 250, 250, 50]]
		});

		$(".item").draggable({
			revert: "invalid",
			helper: "clone",
		});
});

