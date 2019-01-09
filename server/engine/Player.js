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

        this.velX = 0;
        this.velY = 1;
    }

    connect() {
        this.connected = true;
    }

    disconnect() {
        this.connected = false;
    }

    die() {
        console.log(`Player ${this.id} died.`)
        this.game.cells.forEach(e => {
            if (e.ownedBy === this.id) {
                e.clear();
            }
        });
    }

    move() {
        // console.log(`Player ${this.id} moved to ${this.x}/${this.y}.`)
        this.x += this.velX;
        this.y += this.velY;

        try {
            const oCell = this.game.getCell(this.x,this.y);
        } catch (e) {
            this.die();
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