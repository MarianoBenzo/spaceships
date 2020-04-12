import CanvasService from "./CanvasService";
import Universe from "../models/Universe";
import * as io from "socket.io-client";
import GameStats from "../models/GameStats";

class SocketService {
  socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io();
    this.onConnect();
  }

  onConnect() {
    this.socket.on('connect', () => {
      this.onGameUniverse();
    });
  }

  onGameUniverse() {
    this.socket.on('spaceships::game::universe', (universe: Universe) => {
      CanvasService.drawUniverse(universe, this.socket.id);
    });
  }

  onGameStats(setGameStats: Function, setId: Function) {
    this.socket.on('spaceships::game::stats', (gameStats: GameStats) => {
      setGameStats(new GameStats(gameStats));
      setId(this.socket.id);
    });
  }

  emitPlayerStart(name: string) {
    this.socket.emit('spaceships::player::start', name);
  }

  emitKeyUp(accelerating: boolean) {
    this.socket.emit('spaceships::player::key::up', accelerating);
  }

  emitKeyDown(decelerating: boolean) {
    this.socket.emit('spaceships::player::key::down', decelerating);
  }

  emitKeyRight(rotatingRight: boolean) {
    this.socket.emit('spaceships::player::key::right', rotatingRight);
  }

  emitKeyLeft(rotatingLeft: boolean) {
    this.socket.emit('spaceships::player::key::left', rotatingLeft);
  }

  emitKeySpace() {
    this.socket.emit('spaceships::player::key::space');
  }
}

export default new SocketService();
