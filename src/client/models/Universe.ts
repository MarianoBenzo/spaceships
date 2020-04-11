import Ship from "./Ship";
import Projectile from "./Projectile";

class Universe {
  width: number;
  height: number;
  ships: Ship[];
  projectiles: Projectile[];

  constructor(universe: any) {
    this.width = universe.width;
    this.height = universe.height;
    this.ships = universe.ships.map(ship => new Ship(ship));
    this.projectiles = universe.projectiles.map(projectile => new Projectile(projectile));
  }
}

export default Universe;
