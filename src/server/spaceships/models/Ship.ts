class Ship {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  rv: number;
  angle: number;
  accelerationAmount: number;
  decelerationAmount: number;
  friction: number;
  rotationSpeed: number;
  size: number;
  radius: number;
  color: string;
  accelerating: boolean;
  decelerating: boolean;
  rotatingRight: boolean;
  rotatingLeft: boolean;


  constructor(id: string, x: number, y: number, angle: number, size: number, color: string) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.rv = 0;
    this.angle = angle;
    this.accelerationAmount = 0.05;
    this.decelerationAmount = 0.02;
    this.friction = 0.9;
    this.rotationSpeed = 0.01;
    this.size = size;
    this.radius = size;
    this.color = color;
    this.accelerating = false;
    this.decelerating = false;
    this.rotatingRight = false;
    this.rotatingLeft = false;
  }

  setAccelerating(accelerating: boolean) {
    this.accelerating = accelerating;
  }

  setDecelerating(decelerating: boolean) {
    this.decelerating = decelerating;
  }

  setRotatingRight(rotatingRight: boolean) {
    this.rotatingRight = rotatingRight;
  }

  setRotatingLeft(rotatingLeft: boolean) {
    this.rotatingLeft = rotatingLeft;
  }

  update(universeWidth: number, universeHeight: number) {
    if (this.accelerating) { this.accelerate(false);     }
    if (this.decelerating) { this.accelerate(true); }
    if (this.rotatingRight) { this.rotate("right");  }
    if (this.rotatingLeft) { this.rotate("left");   }

    this.move(universeWidth, universeHeight);
  }

  move(universeWidth: number, universeHeight: number) {
    this.angle = (this.angle + this.rv) % (Math.PI * 2);
    this.vx += this.ax;
    this.vy += this.ay;
    this.x += this.vx * Math.cos(this.angle);
    this.y += this.vy * Math.sin(this.angle);
    this.x = Math.max(0, this.x);
    this.y = Math.max(0, this.y);
    this.x = Math.min(universeWidth, this.x);
    this.y = Math.min(universeHeight, this.y);
    this.ax *= this.friction;
    this.ay *= this.friction;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.rv *= this.friction;
  }

  accelerate(backwards: boolean) {
    if (backwards) {
      this.ax -= this.decelerationAmount;
      this.ay -= this.decelerationAmount;
    }
    else {
      this.ax += this.accelerationAmount;
      this.ay += this.accelerationAmount;
    }
  }

  rotate(dir) {
    if (dir === "left") {
      this.rv -= this.rotationSpeed;
    }
    else if (dir === "right") {
      this.rv += this.rotationSpeed;
    }
  }
}

module.exports = Ship;
