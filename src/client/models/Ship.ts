class Ship {
  id: string;
  name: string;
  maxLife: number
  life: number
  x: number;
  y: number;
  angle: number;
  size: number;
  radius: number;
  color: string;

  constructor(ship: any) {
    this.id = ship.id;
    this.name = ship.name;
    this.maxLife = ship.maxLife;
    this.life = ship.life;
    this.x = ship.x;
    this.y = ship.y;
    this.angle = ship.angle;
    this.size = ship.size;
    this.radius = ship.size;
    this.color = ship.color;
  }
}

export default Ship;
