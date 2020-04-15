import Random from 'random';

const Ship = require('./Ship.ts');
const Projectile = require('./Projectile.ts');

class Universe {
  width: number;
  height: number;
  ships: any[];
  projectiles: any[];

  constructor() {
    this.width = 1000;
    this.height = 1000;
    this.ships = [];
    this.projectiles = [];
  }

  addShip(id: string, name: string) {
    const x = Random.uniform(0, this.width)();
    const y = Random.uniform(0, this.height)();
    const ship = new Ship(id, name, 500, x, y, 0, 30, '#fff');
    this.ships.push(ship);
  }

  addProjectile(ship: any) {
    const projectile = new Projectile(ship);
    this.projectiles.push(projectile);
  }

  removeShip(id: string) {
    this.ships = this.ships.filter(ship => ship.id !== id);
  }

  removeProjectile(projectile: any) {
    this.projectiles = this.projectiles.filter(p => p !== projectile);
  }

  update() {
    this.ships.forEach(ship => {
      ship.update(this.width, this.height);
    });
    this.projectiles.forEach(projectile => {
      projectile.update(this.width, this.height);
    });
  }
}

module.exports = Universe;
