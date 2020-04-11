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
    this.ctx.font = '15px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#000000';
    this.ctx.fillText(ship.name, 0, 35);
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
}

export default new CanvasService();
