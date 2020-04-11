class Projectile {
  shipId: string;
  x: number;
  y: number;
  angle: number;

  constructor(projectile: any) {
    this.shipId = projectile.shipId;
    this.x = projectile.x;
    this.y = projectile.y;
    this.angle = projectile.angle;
  }
}

export default Projectile;
