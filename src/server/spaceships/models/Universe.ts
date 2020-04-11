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

    setInterval(this.update.bind(this), 1000 / 60);
  }

  addShip(id: string, name: string) {
    const playing = this.ships.some((ship: any) => ship.id === id);
    if (!playing) {
      const x = Random.uniform(0, this.width)();
      const y = Random.uniform(0, this.height)();
      const ship = new Ship.class(id, name, x, y, 0, 20, '#fff');
      this.ships.push(ship);
    }
  }

  removeShip(id: string) {
    this.ships = this.ships.filter(ship => ship.id !== id);
  }

  removeProjectile(projectile: any) {
    this.projectiles = this.projectiles.filter(p => p !== projectile);
  }

  setShipAccelerating(id: string, accelerating: boolean) {
    const ship = this.ships.find(ship => ship.id === id);
    if (ship) ship.setAccelerating(accelerating);
  }

  setShipDecelerating(id: string, decelerating: boolean) {
    const ship = this.ships.find(ship => ship.id === id);
    if (ship) ship.setDecelerating(decelerating);
  }

  setShipRotatingRight(id: string, rotatingRight: boolean) {
    const ship = this.ships.find(ship => ship.id === id);
    if (ship) ship.setRotatingRight(rotatingRight);
  }

  setShipRotatingLeft(id: string, rotatingLeft: boolean) {
    const ship = this.ships.find(ship => ship.id === id);
    if (ship) ship.setRotatingLeft(rotatingLeft);
  }

  addShoot(id: string) {
    const ship = this.ships.find(ship => ship.id === id);
    if (ship) {
      const projectile = new Projectile.class(ship);
      this.projectiles.push(projectile);
    }
  }

  update() {
    this.updateCollisions();
    this.updateShip();
    this.updateProjectile();
  }

  updateCollisions() {
    this.ships.forEach(ship => {
      this.projectiles.forEach(projectile => {
        if (ship.id !== projectile.shipId) {
          const collision = ship.projectileCollision(projectile);
          if (collision) this.removeProjectile(projectile);
        }
      });
    });
  }

  updateShip() {
    this.ships.forEach(ship => {
      if (ship.life <= 0) this.removeShip(ship.id);
      ship.move(this.width, this.height);
    });
  }

  updateProjectile() {
    this.projectiles.forEach(projectile => {
      if(projectile.x === 0 || projectile.x === this.width || projectile.y === 0 || projectile.y === this.height) {
        this.removeProjectile(projectile);
      }
      projectile.move(this.width, this.height)
    });
  }
}

const instance = new Universe();

module.exports = {
  class: Universe,
  instance: instance
}
