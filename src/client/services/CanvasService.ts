import Universe from '../models/Universe';
import Ship from '../models/Ship';
import Projectile from '../models/Projectile';

class CanvasService {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  viewport: {
    x: number,
    y: number
  };

  constructor() {
    this.ctx = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.viewport = {
      x: this.width / 2,
      y: this.height / 2
    };
  }

  initialize(canvas: HTMLCanvasElement) {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.background = '#eee';
    canvas.width = this.width;
    canvas.height = this.height;

    this.ctx = canvas.getContext('2d');

    window.addEventListener('resize', () => this.resizeCanvas(canvas))
  }

  resizeCanvas(canvas: HTMLCanvasElement) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  drawUniverse(universe: Universe, id: string) {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      const ship = universe.ships.find(ship => ship.id === id);

      if (ship) {
        this.viewport.x = -ship.x + this.width / 2;
        this.viewport.y = -ship.y + this.height / 2;
      } else {
        this.viewport.x = (-universe.width + this.width) / 2;
        this.viewport.y = (-universe.height + this.height) / 2;
      }

      this.drawBackground(universe.width, universe.height);

      universe.ships.forEach((ship: Ship) => {
        this.drawShip(ship);
      });

      universe.projectiles.forEach((projectile: Projectile) => {
        this.drawProjectile(projectile);
      });
    }
  }

  drawBackground(universeWidth: number, universeHeight: number) {
    const fillColor = 'rgba(255, 255, 255)';
    const strokeColor = 'rgba(221, 221, 221)';

    this.ctx.fillStyle = fillColor;
    this.ctx.fillRect(this.viewport.x, this.viewport.y, universeWidth, universeHeight);

    this.ctx.beginPath();
    for (let x = this.viewport.x; x < universeWidth + this.viewport.x; x += 50) {
      this.ctx.moveTo(x, this.viewport.y);
      this.ctx.lineTo(x, universeHeight + this.viewport.y);
    }
    this.ctx.moveTo(universeWidth + this.viewport.x, this.viewport.y);
    this.ctx.lineTo(universeWidth + this.viewport.x, universeHeight + this.viewport.y);

    for (let y = this.viewport.y; y < universeHeight + this.viewport.y; y += 50) {
      this.ctx.moveTo(this.viewport.x, y);
      this.ctx.lineTo(universeWidth + this.viewport.x, y);
    }
    this.ctx.moveTo(this.viewport.x, universeHeight + this.viewport.y);
    this.ctx.lineTo(universeWidth + this.viewport.x, universeHeight + this.viewport.y);

    this.ctx.closePath();

    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

  }

  drawShip(ship: Ship) {
    this.ctx.save();
    this.ctx.translate(ship.x + this.viewport.x, ship.y + this.viewport.y);

    // name
    this.ctx.font = '15px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#000000';
    this.ctx.fillText(ship.name, 0, ship.radius + 15);

    //life
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = this.getLifeColor(ship.life, ship.maxLife);
    this.ctx.beginPath();
    this.ctx.moveTo(
      -(ship.maxLife / 10) / 2,
      ship.radius + 25);
    this.ctx.lineTo(
      ((ship.maxLife / 10) / 2) - ((ship.maxLife - ship.life) / 10),
      ship.radius + 25);
    this.ctx.stroke();
    this.ctx.closePath()

    this.ctx.lineWidth = 1.5;
    this.ctx.strokeStyle = '#000000';
    this.ctx.beginPath();
    this.ctx.strokeRect(
      -(ship.maxLife / 10) / 2,
      ship.radius + 25 - 2.5,
      ship.maxLife / 10,
      5
    );
    this.ctx.closePath()

    // body
    this.ctx.rotate(ship.angle);
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = '#000000';
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(ship.size / 1.2, 0);
    this.ctx.stroke();
    this.ctx.fillStyle = ship.color;
    this.ctx.fillRect(
      ship.size / -2,
      ship.size / -2,
      ship.size,
      ship.size
    );
    this.ctx.strokeRect(
      ship.size / -2,
      ship.size / -2,
      ship.size,
      ship.size
    );
    this.ctx.restore();
  }

  drawProjectile(projectile: Projectile) {
    this.ctx.save();
    this.ctx.translate(projectile.x + this.viewport.x, projectile.y + this.viewport.y);
    this.ctx.rotate(projectile.angle);
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = '#000000';
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(5, 0);
    this.ctx.stroke();
    this.ctx.restore();
  }

  getLifeColor(life: number, maxLife: number) {
    let value = life / maxLife;
    value = Math.min(Math.max(0,value), 1) * 510;

    let redValue;
    let greenValue;
    if (value < 255) {
      redValue = 255;
      greenValue = Math.sqrt(value) * 16;
      greenValue = Math.round(greenValue);
    } else {
      greenValue = 255;
      value = value - 255;
      redValue = 255 - (value * value / 255)
      redValue = Math.round(redValue);
    }

    return "#" + this.intToHex(redValue) + this.intToHex(greenValue) + "00";
  }

  intToHex(i) {
    const hex = parseInt(i).toString(16);
    return (hex.length < 2) ? "0" + hex : hex;
  }

}

export default new CanvasService();
