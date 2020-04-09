import Ship from "./Ship";

class Universe {
  width: number;
  height: number;
  ships: Ship[];

  constructor(universe: any) {
    this.width = universe.width;
    this.height = universe.height;
    this.ships = universe.ships.map(ship => new Ship(ship));
  }
}

export default Universe;
