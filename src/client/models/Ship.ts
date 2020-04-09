class Ship {
  id: string;
  x: number;
  y: number;
  angle: number;
  size: number;
  radius: number;
  color: string;

  constructor(ship: any) {
    this.id = ship.id;
    this.x = ship.x;
    this.y = ship.y;
    this.angle = ship.angle;
    this.size = ship.size;
    this.radius = ship.size;
    this.color = ship.color;
  }
}

export default Ship;
