import SocketService from "./SocketService";

class KeysEventsService {
  aDown: boolean;
  wDown: boolean;
  dDown: boolean;
  sDown: boolean;
  spaceDown: boolean;

  initialize() {
    this.aDown = false;
    this.wDown = false;
    this.dDown = false;
    this.sDown = false;
    this.spaceDown = false;

    this.addKeysDownListener();
    this.addKeysUpListener();
  }

  addKeysDownListener() {
    window.addEventListener("keydown", event => {
      if ((event.code === 'KeyA' || event.code === 'ArrowLeft') && !this.aDown) {
        this.aDown = true;
        SocketService.emitKeyLeft(true);
      }
      else if ((event.code === 'KeyW' || event.code === 'ArrowUp') && !this.wDown) {
        this.wDown = true;
        SocketService.emitKeyUp(true);
      }
      else if ((event.code === 'KeyD' || event.code === 'ArrowRight') && !this.dDown) {
        this.dDown = true;
        SocketService.emitKeyRight(true);
      }
      else if ((event.code === 'KeyS' || event.code === 'ArrowDown') && !this.sDown) {
        this.sDown = true;
        SocketService.emitKeyDown(true);
      }
      else if ((event.code === 'Space') && !this.spaceDown) {
        this.spaceDown = true;
        SocketService.emitKeySpace();
      }
    });
  }

  addKeysUpListener() {
    window.addEventListener("keyup", event => {
      if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
        this.aDown = false;
        SocketService.emitKeyLeft(false);
      }
      else if (event.code === 'KeyW' || event.code === 'ArrowUp') {
        this.wDown = false;
        SocketService.emitKeyUp(false);
      }
      else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
        this.dDown = false;
        SocketService.emitKeyRight(false);
      }
      else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
        this.sDown = false;
        SocketService.emitKeyDown(false);
      }
      else if (event.code === 'Space') {
        this.spaceDown = false;
      }
    });
  }
}

export default new KeysEventsService();
