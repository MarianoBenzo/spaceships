import CanvasService from "./CanvasService";
import UniverseStatistics from "../models/UniverseStatistics";
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

  onSpaceshipsStatistics(setUniverseStatistics: Function) {
    this.socket.on('spaceships::statistics', (universeStatistics: UniverseStatistics) => {
      setUniverseStatistics(universeStatistics);
    });
  }

  emitAccelerating(accelerating: boolean) {
    this.socket.emit('spaceships::ship::accelerating', accelerating)
  }

  emitDecelerating(decelerating: boolean) {
    this.socket.emit('spaceships::ship::decelerating', decelerating)
  }

  emitRotatingRight(rotatingRight: boolean) {
    this.socket.emit('spaceships::ship::rotating::right', rotatingRight)
  }

  emitRotatingLeft(rotatingLeft: boolean) {
    this.socket.emit('spaceships::ship::rotating::left', rotatingLeft)
  }
}

export default new SocketService();
