class Projectile {
  shipId: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  friction: number;

  constructor(ship: any) {
    this.shipId = ship.id;
    this.x = ship.x + ship.radius * Math.cos(ship.angle);
    this.y = ship.y + ship.radius * Math.sin(ship.angle);
    this.vx = 15;
    this.vy = 15;
    this.angle = ship.angle;
    this.friction = 1;
  }

  move(universeWidth: number, universeHeight: number) {
    this.x += this.vx * Math.cos(this.angle);
    this.y += this.vy * Math.sin(this.angle);
    this.x = Math.max(0, this.x);
    this.y = Math.max(0, this.y);
    this.x = Math.min(universeWidth, this.x);
    this.y = Math.min(universeHeight, this.y);
    this.vx *= this.friction;
    this.vy *= this.friction;
  }
}

module.exports = {
  class: Projectile
}
