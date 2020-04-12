export {}

import SocketIO from 'socket.io';
import {Server} from 'http';

const ModuleService = require('../services/ModulesService.ts');

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
      ModuleService.game.connectPlayer(socket.id, name);
    });
  }

  onAccelerating(socket: SocketIO.Socket) {
    socket.on('spaceships::ship::accelerating', (accelerating: boolean) => {
      ModuleService.game.universe.setShipAccelerating(socket.id, accelerating);
    });
  }

  onDecelerating(socket: SocketIO.Socket) {
    socket.on('spaceships::ship::decelerating',  (decelerating: boolean) => {
      ModuleService.game.universe.setShipDecelerating(socket.id, decelerating);
    });
  }

  onRotatingRight(socket: SocketIO.Socket) {
    socket.on('spaceships::ship::rotating::right',  (rotatingRight: boolean) => {
      ModuleService.game.universe.setShipRotatingRight(socket.id, rotatingRight);
    });
  }

  onRotatingLeft(socket: SocketIO.Socket) {
    socket.on('spaceships::ship::rotating::left',  (rotatingLeft: boolean) => {
      ModuleService.game.universe.setShipRotatingLeft(socket.id, rotatingLeft);
    });
  }

  onShoot(socket: SocketIO.Socket) {
    socket.on('spaceships::ship::shoot',  () => {
      ModuleService.game.universe.addShoot(socket.id);
    });
  }

  onDisconnect(socket: SocketIO.Socket) {
    socket.on('disconnect', () => {
      console.log('Disconnect: ', socket.id);
      ModuleService.game.disconnectPlayer(socket.id);
    });
  }

  emitUniverse() {
    const emit = () => {
      this.io.sockets.emit('spaceships::universe', ModuleService.game.universe);
    };
    setInterval(emit, 1000/60);
  }

  emitGame() {
    const emit = () => {
      this.io.sockets.emit('spaceships::game', ModuleService.game.getStats());
    };
    setInterval(emit, 1000/10)
  }
}

module.exports = new SocketIOService();
