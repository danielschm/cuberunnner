"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const
        CANVAS = new Canvas(),
        SOCKET = io();

    SOCKET.on("move", ({cells: aCells, player: oPlayer}) => {
        console.log(aCells);
        CANVAS.setCells(aCells);
        CANVAS.setPlayer(oPlayer);
    });

    SOCKET.on("loop", (oData) => {
        // console.log(oData);
    });

    function todo(data) {
        // data = { cells: [[],[]], player: {} }

        let x = data.cells.length;
        let y = data.cells[0].length;
    }

    SOCKET.connect();

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