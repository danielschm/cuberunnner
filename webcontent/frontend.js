"use strict";

document.addEventListener("DOMContentLoaded", () => {
	const
		CANVAS = new Canvas(),
		SOCKET = io();

	SOCKET.on("move", ({ cells: aCells, player: oPlayer }) => {
		console.log(aCells);
		CANVAS.setCells(aCells);
		CANVAS.setPlayer(oPlayer);
	});

	function todo(data) {
		// data = { cells: [[],[]], player: {} }

		let x = data.cells.length;
		let y = data.cells[0].length;
	}

	SOCKET.connect();
}, false);