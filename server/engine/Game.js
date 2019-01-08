const Cell = require("./Cell");

module.exports = class Game {
  constructor() {
      this.width = 200;
      this.height = 200;
      this.cells = this.createCells();
      this.players = [];
  }

  createCells() {
      const aGrid = [];
      for(let i = 0; i < this.height; i++) {
          const aRow = [];
          for(let j = 0; j < this.width; j++) {
            aRow.push(new Cell({
                x: j,
                y: i
            }));
          }
          aGrid.push(aRow);
      }
      return aGrid;
  }

  addPlayer(o) {
      this.players.push(new Player(o));
  }

  start() {
      // if players connected etc....
      this.loop();
  }

  loop() {
      this.players.forEach(player => {
          player.move();
      })
  }
};