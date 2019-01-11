const Cell = require("./Cell");
const Player = require("./Player");

module.exports = class Game {
    constructor(io) {
        this.width = 20;
        this.height = 20;
        this.cells = this.createCells();
        this.players = [];
        this.io = io;
    }

    createCells() {
        const aGrid = [];
        for (let i = 0; i < this.width; i++) {
            const aColumn = [];
            for (let j = 0; j < this.height; j++) {
                aColumn.push(new Cell({
                    x: i,
                    y: j
                }));
            }
            aGrid.push(aColumn);
        }
        return aGrid;
    }

    getPlayer(id) {
        const oPlayer = this.players.find(e => e.id === id);
        if (!oPlayer) throw "Player not found";
        else return oPlayer;
    }

    connectPlayer(id) {
        let oPlayer;
        try {
            oPlayer = this.getPlayer(id);
        } catch (e) {
            oPlayer = this.createPlayer(id);
        }
        oPlayer.connected = true;
        console.log("User connected: " + id);
        try {
            oPlayer.spawn();
        } catch (e) {
            console.error(e);
        }
    }

    disconnectPlayer(id) {
        const oPlayer = this.players.find(e => e.id === id);
        oPlayer.clearAllCells();
        Object.assign(oPlayer, {
            x: undefined,
            y: undefined,
            connected: false
        });
        console.log("User disconnected: " + id);
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
        const that = this;


        function checkCell(oCell) {
            if (that.getCell(oCell.x+2, oCell.y) === undefined) return false;
            if (that.getCell(oCell.x, oCell.y+2) === undefined) return false;
            if (that.getCell(oCell.x-2, oCell.y) === undefined) return false;
            if (that.getCell(oCell.x, oCell.y-2) === undefined) return false;
            return true;
        }

        if (oCell && oCell.state === 0 && checkCell(oCell)) {
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
            }
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
            if (!player.dead) {
                player.move();
            }
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