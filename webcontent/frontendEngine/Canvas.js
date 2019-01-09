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

class Canvas {
	constructor() {
		this._CANVAS = document.getElementById("canvas");
		this._cells = [];
		this._player = {};

		window.addEventListener("resize", fnResizeHandler.bind(window, this._CANVAS));

		fnResizeHandler(this._CANVAS);
	}

	setCells(aCells) {
		if (!aCells instanceof Array) {
			throw new Error("Invalid arguments");
		}

		this._cells = aCells;

		return this;
	}

	setPlayer(oPlayer) {
		if (!oPlayer) {
			throw new Error("Invalid arguments");
		}

		this._player = oPlayer;

		return this;
	}

	draw() {
		const
			oPlayer = this.getPlayer(),
			sDirection = oPlayer.direction();

		/**
		 * TODO:
		 *  player stays in the middle
		 *  tail is drawn in the opposite direction of the players current direction
		 *    (e.g. player moves up -> tail gets longer underneath the player)
		 *  movement continues until direction changes
		 */

		// this._drawBackground();
		// this._drawOpponents();
		// this._drawPlayer();

		switch (sDirection) {
			case DIRECTIONS.UP: {
				break;
			}
			case DIRECTIONS.DOWN: {
				break;
			}
			case DIRECTIONS.LEFT: {
				break;
			}
			case DIRECTIONS.RIGHT: {
				break;
			}
		}
	}

	drawCell(x, y) {

	}

	drawPlayer() {

	}
}