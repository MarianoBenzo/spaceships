import Random from 'random';

const Ship = require("./Ship.ts");

class Universe {
  width: number;
  height: number;
  ships: Ship[];

  constructor() {
    this.width = 1000;
    this.height = 1000;
    this.ships = [];

    setInterval(this.update.bind(this), 1000 / 60);
  }

  addShip(id: string) {
    const x = Random.uniform(0, this.width)();
    const y = Random.uniform(0, this.height)();
    const ship = new Ship(id, x, y, 0, 20, '#fff');
    this.ships.push(ship);
  }

  removeShip(id: string) {
    this.ships = this.ships.filter(ship => ship.id !== id);
  }

  update() {
    this.ships.forEach(ship => ship.update(this.width, this.height));
  }
}

module.exports = new Universe();
