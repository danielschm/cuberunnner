const
    UP = "up",
    LEFT = "left",
    RIGHT = "right",
    DOWN = "down";

module.exports = class Player {
    constructor(o) {
        this.id = o.id;
        this.x = o.x;
        this.y = o.y;
        this.color = o.color;
        this.connected = false;
        this.game = o.game;
        this.dead = true;

        this.velX = 0;
        this.velY = 1;

        this.directionChanges = [];
        this.paintedCells = [];
    }

    connect() {
        this.connected = true;
    }

    disconnect() {
        this.connected = false;
    }

    die() {
        this.dead = true;
        console.log(`Player ${this.id} died at cell ${this.x}:${this.y}.`)
        this.clearAllCells();

        //TODO Respawn
        // this.respawn();
    }

    createSpawnBase(x, y) {
        let oStartCell = this.game.getCell(x, y);
        if (oStartCell) {
            oStartCell.ownedBy = this.id;
            oStartCell.state = 2;
        }
        oStartCell = this.game.getCell(x+1, y);
        if (oStartCell) {
            oStartCell.ownedBy = this.id;
            oStartCell.state = 2;
        }
        oStartCell = this.game.getCell(x+1, y+1);
        if (oStartCell) {
            oStartCell.ownedBy = this.id;
            oStartCell.state = 2;
        }
        oStartCell = this.game.getCell(x+1, y-1);
        if (oStartCell) {
            oStartCell.ownedBy = this.id;
            oStartCell.state = 2;
        }
        oStartCell = this.game.getCell(x, y+1);
        if (oStartCell) {
            oStartCell.ownedBy = this.id;
            oStartCell.state = 2;
        }
        oStartCell = this.game.getCell(x, y-1);
        if (oStartCell) {
            oStartCell.ownedBy = this.id;
            oStartCell.state = 2;
        }
        oStartCell = this.game.getCell(x-1, y-1);
        if (oStartCell) {
            oStartCell.ownedBy = this.id;
            oStartCell.state = 2;
        }
        oStartCell = this.game.getCell(x-1, y);
        if (oStartCell) {
            oStartCell.ownedBy = this.id;
            oStartCell.state = 2;
        }
        oStartCell = this.game.getCell(x-1, y+1);
        if (oStartCell) {
            oStartCell.ownedBy = this.id;
            oStartCell.state = 2;
        }
    }

    spawn() {
        try {
            const oCell = this.game.findFreeCell();
            this.x = oCell.x;
            this.y = oCell.y;
            this.dead = false;
            this.createSpawnBase(this.x,this.y);
        } catch (e) {
            console.error(e);
        }
    }

    clearAllCells() {
        this.game.cells.forEach(row => {
            row.forEach(cell => {
                if (cell.ownedBy === this.id) {
                    cell.clear();
                }
            })
        });
    }

    move() {
        if (this.directionChanges && this.directionChanges.length > 0) {
            this.changeDirection(this.directionChanges[0]);
            this.directionChanges.splice(0, 1);
        }

        // console.log(`Player ${this.id} moved to ${this.x}/${this.y}.`)
        this.x += this.velX;
        this.y += this.velY;

        const oCell = this.game.getCell(this.x, this.y);
        if (oCell) {
            if (oCell.ownedBy === this.id && oCell.state === 2 && this.paintedCells.length > 1) {
                this.fillPaintedCells();
                this.paintedCells = [];
            } else {
                if (oCell.ownedBy !== this.id) {
                    this.paintedCells.push(oCell);
                    oCell.ownedBy = this.id;
                    oCell.state = 1;
                }
            }
        } else {
            this.die();
        }
    }

    fillPaintedCells() {
        const
            GAME = this.game,
            that = this;

        this.paintedCells.forEach(e => {
            e.state = 2;
            e.ownedBy = this.id;
        });

        const iMinX = this.paintedCells.reduce((minimum, c) => {
            return Math.min(minimum, c.x);
        }, this.paintedCells[0].x);
        const iMinY = this.paintedCells.reduce((minimum, c) => {
            return Math.min(minimum, c.y);
        }, this.paintedCells[0].y);
        const iMaxX = this.paintedCells.reduce((maximum, c) => {
            return Math.max(maximum, c.x);
        }, this.paintedCells[0].x);
        const iMaxY = this.paintedCells.reduce((maximum, c) => {
            return Math.max(maximum, c.y);
        }, this.paintedCells[0].y);

        const iDiffX = iMaxX - iMinX;
        const iDiffY = iMaxY - iMinY;

        function checkCell(oCell) {
            if (oCell.state === 0) {
                let iPaintedCellsAround = 0;

                for (let i = 0; i < iMaxX; i++) {
                    if (GAME.cells[oCell.x+i][oCell.y].ownedBy === that.id) {
                        iPaintedCellsAround++;
                        break;
                    }
                }

                if (iPaintedCellsAround === 0) return false;

                for (let i = 0; i < iMinX; i++) {
                    if (GAME.cells[oCell.x-i][oCell.y].ownedBy === that.id) {
                        iPaintedCellsAround++;
                        break;
                    }
                }

                if (iPaintedCellsAround === 1) return false;

                for (let i = 0; i < iMaxY; i++) {
                    if (GAME.cells[oCell.x][oCell.y+i].ownedBy === that.id) {
                        iPaintedCellsAround++;
                        break;
                    }
                }

                if (iPaintedCellsAround === 2) return false;

                for (let i = 0; i < iMinY; i++) {
                    if (GAME.cells[oCell.x][oCell.y-i].ownedBy === that.id) {
                        iPaintedCellsAround++;
                        break;
                    }
                }

                return iPaintedCellsAround === 4;
            }
        }

        for (let i = 0; i < iDiffX; i++) {
            for (let j = 0; j < iDiffY; j++) {
                const oCell = GAME.cells[iMinX+i][iMinY+j];
                if (checkCell(oCell)) {
                    oCell.ownedBy = that.id;
                    oCell.state = 2;
                }
            }
        }
    }

    addDirectionChange(sDirection) {
        if (this.directionChanges.length < 2) {
            this.directionChanges.push(sDirection);
        }
    }

    changeDirection(sDirection) {
        console.log(`Player ${this.id} changed direction to ${sDirection}`);
        switch (sDirection) {
            case UP:
                if (this.velY !== 1) {
                    this.velX = 0;
                    this.velY = -1;
                }
                break;
            case LEFT:
                if (this.velX !== 1) {
                    this.velX = -1;
                    this.velY = 0;
                }
                break;
            case RIGHT:
                if (this.velX !== -1) {
                    this.velX = 1;
                    this.velY = 0;
                }
                break;
            case DOWN:
                if (this.velY !== -1) {
                    this.velX = 0;
                    this.velY = 1;
                }
                break;
            default:
                break;
        }
    }
};