"use strict";

function fnResizeHandler(CANVAS) {
	CANVAS.width = this.innerWidth;
	CANVAS.height = (this.innerWidth / (16 / 9));

	console.log(this.innerHeight, this.innerWidth)
}

document.addEventListener("DOMContentLoaded", () => {
	const
		CANVAS = new Canvas(),
		SOCKET = io();

	window.addEventListener("resize", fnResizeHandler.bind(window, CANVAS));

	function todo(data) {
		// data = { cells: [[],[]], player: {} }

		let x = data.cells.length;
		let y = data.cells[0].length;
	}
}, false);