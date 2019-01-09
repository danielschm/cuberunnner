const FREE = 0;
const FILLED = 1;

module.exports = class Cell {
    constructor(o) {
        this.x = o.x;
        this.y = o.y;
        this.state = FREE;
        this.ownedBy = null;
    }

    fill(id) {
        this.state = FILLED;
        this.ownedBy = id;
    }

    clear() {
        this.state = FREE;
        this.ownedBy = null;
    }
}