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
    this.io.on('connection', (socket) => {
      console.log('New connection: ', socket.id);
      Universe.addShip(socket.id);

      this.onDisconnect(socket);
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

  emitStatistics() {
    const emit = () => {
      const statistics = new UniverseStatistics(Universe);
      this.io.sockets.emit('spaceships::statistics', statistics);
    };
    setInterval(emit, 1000/10)
  }
}

module.exports = new SocketIOService();
