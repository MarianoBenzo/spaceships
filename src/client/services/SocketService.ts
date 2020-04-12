import CanvasService from "./CanvasService";
import Game from "../models/Game";
import Universe from "../models/Universe";
import * as io from "socket.io-client";

class SocketService {
  socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io();
    this.onConnect();
  }

  onConnect() {
    this.socket.on('connect', () => {
      this.onSpaceshipsUniverse();
    });
  }

  onSpaceshipsUniverse() {
    this.socket.on('spaceships::universe', (universe: Universe) => {
      CanvasService.drawUniverse(universe, this.socket.id);
    });
  }

  onSpaceshipsGame(setGame: Function, setId: Function) {
    this.socket.on('spaceships::game', (players: string[]) => {
      setGame(players);
      setId(this.socket.id);
    });
  }

  emitAddShip(name: string) {
    this.socket.emit('spaceships::ship', name);
  }

  emitAccelerating(accelerating: boolean) {
    this.socket.emit('spaceships::ship::accelerating', accelerating);
  }

  emitDecelerating(decelerating: boolean) {
    this.socket.emit('spaceships::ship::decelerating', decelerating);
  }

  emitRotatingRight(rotatingRight: boolean) {
    this.socket.emit('spaceships::ship::rotating::right', rotatingRight);
  }

  emitRotatingLeft(rotatingLeft: boolean) {
    this.socket.emit('spaceships::ship::rotating::left', rotatingLeft);
  }

  emitShoot() {
    this.socket.emit('spaceships::ship::shoot');
  }
}

export default new SocketService();
