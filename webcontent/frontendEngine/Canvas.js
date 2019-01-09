function fnResizeHandler(CANVAS) {
	CANVAS.width = this.innerWidth;
	CANVAS.height = this.innerHeight;
}

const DIRECTIONS = Object.freeze({
	UP: "UP",
	DOWN: "DOWN",
	LEFT: "LEFT",
	RIGHT: "RIGHT"
});

const CELL = Object.freeze({
	WIDTH: 20
});

class Canvas {
	constructor() {
		this._CANVAS = document.getElementById("canvas");
		this._CTX = this._CANVAS.getContext("2d");
		this._cells = [];
		this._players = [];

		window.addEventListener("resize", fnResizeHandler.bind(window, this._CANVAS));

		fnResizeHandler(this._CANVAS);

		// this._drawInterval = window.setInterval(this.draw, 50)
		this.draw()
	}

	setCells(aCells) {
		if (!aCells instanceof Array) {
			throw new Error("Invalid arguments");
		}

		this._cells = aCells;

		return this;
	}

	setPlayers(oPlayer) {
		if (!oPlayer) {
			throw new Error("Invalid arguments");
		}

		this._players = oPlayer;

		return this;
	}

	draw() {
		/**
		 * TODO:
		 *  player stays in the middle
		 *  tail is drawn in the opposite direction of the players current direction
		 *    (e.g. player moves up -> tail gets longer underneath the player)
		 *  movement continues until direction changes
		 */

		const
			oPlayer = this._players[0],
			// sDirection = oPlayer.direction(),
			{width: iWidth, height: iHeight} = this._CANVAS,
			iCenterX = iWidth / 2,
			iCenterY = iHeight / 2;

		this._drawBackground();

		this._CTX.fillStyle = "#000";
		this._CTX.strokeStyle = "#000";

		this._cells.forEach(oCell => {
			oCell.forEach(cell => {
				const x = cell.x * CELL.WIDTH;
				const y = cell.y * CELL.WIDTH;
				this._CTX.strokeRect(x, y, CELL.WIDTH, CELL.WIDTH);
			})
		});


		// this._drawOpponents();
		// this._drawPlayer();

		// switch (sDirection) {
		// 	case DIRECTIONS.UP: {
		// 		break;
		// 	}
		// 	case DIRECTIONS.DOWN: {
		// 		break;
		// 	}
		// 	case DIRECTIONS.LEFT: {
		// 		break;
		// 	}
		// 	case DIRECTIONS.RIGHT: {
		// 		break;
		// 	}
		// }
	}

	_drawBackground() {
		const oCtx = this._CTX;

		oCtx.fillStyle = "#FFFFFF";
		oCtx.fillRect(0, 0, this._CANVAS.width, this._CANVAS.height);
	}

	drawCell(x, y) {

	}

	drawPlayer() {

	}
}