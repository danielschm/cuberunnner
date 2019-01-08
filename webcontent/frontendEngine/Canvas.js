function fnResizeHandler(CANVAS) {
	CANVAS.width = this.innerWidth;
	CANVAS.height = (this.innerWidth / (16 / 9));

	console.log(this.innerHeight, this.innerWidth)
}

class Canvas {
	constructor() {
		this._CANVAS = document.getElementById("canvas");

		// window.addEventListener("resize", fnResizeHandler.bind(window, this._CANVAS));
	}

	draw() {

	}

	drawCell(x, y) {

	}

	drawPlayer() {

	}
}