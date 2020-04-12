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

      this.onKeyUp(socket);
      this.onKeyDown(socket);
      this.onKeyRight(socket);
      this.onKeyLeft(socket);
      this.onKeySpace(socket)
    });
  }

  onPlayerStart(socket: SocketIO.Socket) {
    socket.on('spaceships::player::start', (name: string) => {
      ModuleService.game.startPlayer(socket.id, name);
    });
  }

  onKeyUp(socket: SocketIO.Socket) {
    socket.on('spaceships::player::key::up', (keydown: boolean) => {
      ModuleService.game.universe.setShipAccelerating(socket.id, keydown);
    });
  }

  onKeyDown(socket: SocketIO.Socket) {
    socket.on('spaceships::player::key::down',  (keydown: boolean) => {
      ModuleService.game.universe.setShipDecelerating(socket.id, keydown);
    });
  }

  onKeyRight(socket: SocketIO.Socket) {
    socket.on('spaceships::player::key::right',  (keydown: boolean) => {
      ModuleService.game.universe.setShipRotatingRight(socket.id, keydown);
    });
  }

  onKeyLeft(socket: SocketIO.Socket) {
    socket.on('spaceships::player::key::left',  (keydown: boolean) => {
      ModuleService.game.universe.setShipRotatingLeft(socket.id, keydown);
    });
  }

  onKeySpace(socket: SocketIO.Socket) {
    socket.on('spaceships::player::key::space',  () => {
      ModuleService.game.universe.addShoot(socket.id);
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
