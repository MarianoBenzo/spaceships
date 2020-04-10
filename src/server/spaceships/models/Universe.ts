import Random from 'random';

const Ship = require("./Ship.ts");
const SocketIOService = require("../services/SocketIOService.ts");

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

  addShip(id: string, name: string) {
    const playing = this.ships.some((ship: Ship) => ship.id === id);
    if(!playing) {
      const x = Random.uniform(0, this.width)();
      const y = Random.uniform(0, this.height)();
      const ship = new Ship(id, name, x, y, 0, 20, '#fff');
      this.ships.push(ship);
    }
  }

  removeShip(id: string) {
    this.ships = this.ships.filter(ship => ship.id !== id);
  }

  killShip(id: string) {
    SocketIOService.emitShipDead(id);
    this.removeShip(id);
  }

  setShipAccelerating(id: string, accelerating: boolean) {
    const ship = this.ships.find(ship => ship.id === id);
    if(ship) ship.setAccelerating(accelerating);
  }

  setShipDecelerating(id: string, decelerating: boolean) {
    const ship = this.ships.find(ship => ship.id === id);
    if(ship) ship.setDecelerating(decelerating);
  }

  setShipRotatingRight(id: string, rotatingRight: boolean) {
    const ship = this.ships.find(ship => ship.id === id);
    if(ship) ship.setRotatingRight(rotatingRight);
  }

  setShipRotatingLeft(id: string, rotatingLeft: boolean) {
    const ship = this.ships.find(ship => ship.id === id);
    if(ship) ship.setRotatingLeft(rotatingLeft);
  }

  update() {
    this.ships.forEach(ship => ship.update(this.width, this.height));
  }
}

module.exports = new Universe();
