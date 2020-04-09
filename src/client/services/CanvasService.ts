import Universe from "../models/Universe";
import Ship from "../models/Ship";

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
    canvas.style.background = "#eee";
    canvas.width = this.width;
    canvas.height = this.height;

    this.ctx = canvas.getContext('2d');
  }

  drawUniverse(universe: Universe, id: string) {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      const ship = universe.ships.find(ship => ship.id === id);

      if (ship) {
        this.viewport.x = -ship.x + this.width / 2;
        this.viewport.y = -ship.y + this.height / 2;
      }

      this.drawBackground(universe.width, universe.height);

      universe.ships.forEach( (ship: Ship) => {
          this.drawShip(ship);
      });
    }
  }

  drawBackground(universeWidth: number, universeHeight: number) {
    for (let i = 0; i < universeHeight; i += 50) {
      for (let j = 0; j < universeWidth; j += 50) {
        if ((i / 50 + j / 50) & 1) {
          this.ctx.fillStyle = "hsl(" + (360 - (i + j) / 10) + ", 50%, 70%)";
          this.ctx.fillRect(j + this.viewport.x, i + this.viewport.y, 50, 50);
          //this.ctx.fillRect(j, i, 50, 50);
        }
      }
    }
  }

  drawShip(ship: Ship) {
    this.ctx.save();
    this.ctx.translate(ship.x + this.viewport.x, ship.y + this.viewport.y);
    this.ctx.rotate(ship.angle);
    this.ctx.lineWidth = 3;
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
}

export default new CanvasService();
