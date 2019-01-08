const FREE = 0;
const FILLED = 1;

class Cell {
    constructor(x,y) {
        this.x = x;
        this.y = y;
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