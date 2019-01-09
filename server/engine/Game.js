const Cell = require("./Cell");
const Player = require("./Player");

module.exports = class Game {
    constructor(io) {
        this.width = 200;
        this.height = 200;
        this.cells = this.createCells();
        this.players = [];
        this.io = io;
    }

    createCells() {
        const aGrid = [];
        for (let i = 0; i < this.height; i++) {
            const aRow = [];
            for (let j = 0; j < this.width; j++) {
                aRow.push(new Cell({
                    x: j,
                    y: i
                }));
            }
            aGrid.push(aRow);
        }
        return aGrid;
    }

    connectPlayer(id) {
        try {
            const oPlayer = this.players.find(e => e.id === id) || this.createPlayer(id);
            const oCell = this.findFreeCell();
            oPlayer.x = oCell.x;
            oPlayer.y = oCell.y;
            oPlayer.connected = true;
        } catch (e) {
            console.error(e);
        }
    }

    disconnectPlayer(id) {
        const oPlayer = this.players.find(e => e.id === id);
        Object.assign(oPlayer, {
            x: undefined,
            y: undefined,
            connected: false
        });
    }

    createPlayer(id) {
        const oPlayer = new Player({
            x: undefined,
            y: undefined,
            id: id,
            game: this
        });

        this.players.push(oPlayer);
        return oPlayer;
    }

    findFreeCell() {
        const x = Math.round(Math.random() * this.width);
        const y = Math.round(Math.random() * this.height);
        const oCell = this.cells[x] ? this.cells[x][y] : undefined;
        if (oCell && oCell.state === 0) {
            this.findFreeCellCounter = 0;
            return oCell;
        } else if (this.findFreeCellCounter < 10) {
            this.findFreeCellCounter = this.findFreeCellCounter ? this.findFreeCellCounter + 1 : 1;
            return this.findFreeCell();
        } else {
            throw "No free cell available";
        }
    }

    getCell(x, y) {
        if (this.cells[x]) {
            if (this.cells[x][y]) {
                return this.cells[x][y];
            } else {
                throw "Not found";
            }
        } else {
            throw "Not found";
        }
    }

    start() {
        // if players connected etc....
        this.running = true;
        const i = setInterval(() => {
            if (this.running) {
                this.loop();
            } else {
                clearInterval(i);
            }
        }, 200);
    }

    quit() {
        console.log("Quit game");
        this.running = false;
    }

    loop() {
        this.players.forEach(player => {
            player.move();
        });
        this.io.emit("loop", {
            players: this.players.map(e => {
                return {
                    x: e.x,
                    y: e.y
                };
            }),
            cells: this.cells,
            running: this.running
        })
    }

};