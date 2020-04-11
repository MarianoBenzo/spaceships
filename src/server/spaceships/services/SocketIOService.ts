import SocketIO from 'socket.io';
import {Server} from 'http';

const Universe = require('../models/Universe.ts')
const Game = require('../models/Game.ts')

class SocketIOService {
  io: SocketIO.Server;

  init(server: Server) {
    this.io = SocketIO(server);
    this.onConnection();
    this.emitUniverse();
    this.emitGame();
  }

  onConnection() {
    this.io.on('connection', (socket: SocketIO.Socket) => {
      console.log('New connection: ', socket.id);

      this.onAddShip(socket);
      this.onAccelerating(socket);
      this.onDecelerating(socket);
      this.onRotatingRight(socket);
      this.onRotatingLeft(socket);
      this.onShoot(socket)

      this.onDisconnect(socket);
    });
  }

  onAddShip(socket: SocketIO.Socket) {
    socket.on('spaceships::ship', (name: string) => {
      Universe.instance.addShip(socket.id, name);
    });
  }

  onAccelerating(socket: SocketIO.Socket) {
    socket.on('spaceships::ship::accelerating', (accelerating: boolean) => {
      Universe.instance.setShipAccelerating(socket.id, accelerating);
    });
  }

  onDecelerating(socket: SocketIO.Socket) {
    socket.on('spaceships::ship::decelerating',  (decelerating: boolean) => {
      Universe.instance.setShipDecelerating(socket.id, decelerating);
    });
  }

  onRotatingRight(socket: SocketIO.Socket) {
    socket.on('spaceships::ship::rotating::right',  (rotatingRight: boolean) => {
      Universe.instance.setShipRotatingRight(socket.id, rotatingRight);
    });
  }

  onRotatingLeft(socket: SocketIO.Socket) {
    socket.on('spaceships::ship::rotating::left',  (rotatingLeft: boolean) => {
      Universe.instance.setShipRotatingLeft(socket.id, rotatingLeft);
    });
  }

  onShoot(socket: SocketIO.Socket) {
    socket.on('spaceships::ship::shoot',  () => {
      Universe.instance.addShoot(socket.id);
    });
  }

  onDisconnect(socket: SocketIO.Socket) {
    socket.on('disconnect', () => {
      console.log('Disconnect: ', socket.id);
      Universe.instance.removeShip(socket.id);
    });
  }

  emitUniverse() {
    const emit = () => {
      this.io.sockets.emit('spaceships::universe', Universe.instance);
    };
    setInterval(emit, 1000/60);
  }

  emitGame() {
    const emit = () => {
      const game = new Game.class(Universe.instance);
      this.io.sockets.emit('spaceships::game', game);
    };
    setInterval(emit, 1000/10)
  }
}

const instance = new SocketIOService();

module.exports = {
  class: SocketIOService,
  instance: instance
}
