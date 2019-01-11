"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const
        CANVAS = new Canvas(),
        SOCKET = io();

    SOCKET.on("loop", ({cells: aCells, players: aPlayer}) => {
    	if (!window.x) {
    		window.x = aCells[0][0]
		}
		CANVAS.setCells(aCells);
		CANVAS.setPlayers(aPlayer);
		CANVAS.draw();
		document.getElementById("x").innerText = aPlayer[0].x;
		document.getElementById("y").innerText = aPlayer[0].y;
    });

    SOCKET.connect();

    // window.setTimeout(() => CANVAS.draw(), 3000)

    window.addEventListener("keydown", oEvent => {
        switch (oEvent.which) {
            case 38:
                SOCKET.emit("changeDirection", "up");
                break;
            case 37:
                SOCKET.emit("changeDirection", "left");
                break;
            case 39:
                SOCKET.emit("changeDirection", "right");
                break;
            case 40:
                SOCKET.emit("changeDirection", "down");
                break;
            default:
                break;
        }
    });
}, false);