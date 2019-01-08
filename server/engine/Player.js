class Player {
    constructor(o) {
        this.id = o.id;
        this.x = o.x;
        this.y = o.y;
        this.color = o.c || o.color;
        this.connected = false;

        this.velX = 0;
        this.velY = 1;
    }

    connect() {
        this.connected = true;
    }

    disconnect() {
        this.connected = false;
    }

    move() {
        this.x += this.velX;
        this.y += this.velY;
    }

    changeDirection(sDirection) {

    }
}