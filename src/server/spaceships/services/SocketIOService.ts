export {}

import SocketIO from 'socket.io';
import {Server} from 'http';

const ModuleService = require('../services/ModulesService.ts');

class SocketIOService {
  io: SocketIO.Server;

  init(server: Server) {
    this.io = SocketIO(server);
    this.onConnection();
    this.emitGameUniverse();
    this.emitGameStats();
  }

  onConnection() {
    this.io.on('connection', (socket: SocketIO.Socket) => {
      console.log('New connection: ', socket.id);

      this.onPlayerStart(socket);
      this.onPlayerDisconnect(socket);

      this.onPlayerKey(socket);
    });
  }

  onPlayerStart(socket: SocketIO.Socket) {
    socket.on('spaceships::player::start', (name: string) => {
      ModuleService.game.startPlayer(socket.id, name);
    });
  }

  onPlayerKey(socket: SocketIO.Socket) {
    socket.on('spaceships::player::key', ({key, keydown}) => {
      ModuleService.game.onPlayerKey(socket.id, key, keydown);
    });
  }

  onPlayerDisconnect(socket: SocketIO.Socket) {
    socket.on('disconnect', () => {
      console.log('Disconnect: ', socket.id);
      ModuleService.game.disconnectPlayer(socket.id);
    });
  }

  emitGameUniverse() {
    const emit = () => {
      this.io.sockets.emit('spaceships::game::universe', ModuleService.game.universe);
    };
    setInterval(emit, 1000/60);
  }

  emitGameStats() {
    const emit = () => {
      this.io.sockets.emit('spaceships::game::stats', ModuleService.game.getGameStats());
    };
    setInterval(emit, 1000/10)
  }
}

module.exports = new SocketIOService();
