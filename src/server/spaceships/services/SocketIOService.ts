import SocketIO from 'socket.io';
import {Server} from 'http';

const Universe = require("../models/Universe.ts");
const UniverseStatistics = require("../models/UniverseStatistics.ts");

class SocketIOService {
  io: SocketIO.Server;

  init(server: Server) {
    this.io = SocketIO(server);
    this.onConnection();
    this.emitUniverse();
    this.emitStatistics();
  }

  onConnection() {
    this.io.on('connection', (socket: SocketIO.Socket) => {
      console.log('New connection: ', socket.id);

      this.onAddShip(socket);
      this.onAccelerating(socket);
      this.onDecelerating(socket);
      this.onRotatingRight(socket);
      this.onRotatingLeft(socket);

      this.onDisconnect(socket);
    });
  }

  onAddShip(socket: SocketIO.Socket) {
    socket.on('spaceships::ship', (name: string) => {
      Universe.addShip(socket.id, name);
    });
  }

  onAccelerating(socket: SocketIO.Socket) {
    socket.on('spaceships::ship::accelerating', (accelerating: boolean) => {
      Universe.setShipAccelerating(socket.id, accelerating);
    });
  }

  onDecelerating(socket: SocketIO.Socket) {
    socket.on('spaceships::ship::decelerating',  (decelerating: boolean) => {
      Universe.setShipDecelerating(socket.id, decelerating);
    });
  }

  onRotatingRight(socket: SocketIO.Socket) {
    socket.on('spaceships::ship::rotating::right',  (rotatingRight: boolean) => {
      Universe.setShipRotatingRight(socket.id, rotatingRight);
    });
  }

  onRotatingLeft(socket: SocketIO.Socket) {
    socket.on('spaceships::ship::rotating::left',  (rotatingLeft: boolean) => {
      Universe.setShipRotatingLeft(socket.id, rotatingLeft);
    });
  }

  onDisconnect(socket: SocketIO.Socket) {
    socket.on('disconnect', () => {
      console.log('Disconnect: ', socket.id);
      Universe.removeShip(socket.id);
    });
  }

  emitUniverse() {
    const emit = () => {
      this.io.sockets.emit('spaceships::universe', Universe);
    };
    setInterval(emit, 1000/60);
  }

  emitShipDead(id: string) {
    this.io.to(id).emit('spaceships::ship::dead');
  }

  emitStatistics() {
    const emit = () => {
      const statistics = new UniverseStatistics(Universe);
      this.io.sockets.emit('spaceships::statistics', statistics);
    };
    setInterval(emit, 1000/10)
  }
}

module.exports = new SocketIOService();
