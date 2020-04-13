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
        SocketService.emitPlayerKey('left', true);
      }
      else if ((event.code === 'KeyW' || event.code === 'ArrowUp') && !this.wDown) {
        this.wDown = true;
        SocketService.emitPlayerKey('up', true);
      }
      else if ((event.code === 'KeyD' || event.code === 'ArrowRight') && !this.dDown) {
        this.dDown = true;
        SocketService.emitPlayerKey('right', true);
      }
      else if ((event.code === 'KeyS' || event.code === 'ArrowDown') && !this.sDown) {
        this.sDown = true;
        SocketService.emitPlayerKey('down', true);
      }
      else if ((event.code === 'Space') && !this.spaceDown) {
        this.spaceDown = true;
        SocketService.emitPlayerKey('space', true);
      }
    });
  }

  addKeysUpListener() {
    window.addEventListener("keyup", event => {
      if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
        this.aDown = false;
        SocketService.emitPlayerKey('left', false);
      }
      else if (event.code === 'KeyW' || event.code === 'ArrowUp') {
        this.wDown = false;
        SocketService.emitPlayerKey('up', false);
      }
      else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
        this.dDown = false;
        SocketService.emitPlayerKey('right', false);
      }
      else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
        this.sDown = false;
        SocketService.emitPlayerKey('down', false);
      }
      else if (event.code === 'Space') {
        this.spaceDown = false;
        SocketService.emitPlayerKey('space', false);
      }
    });
  }
}

export default new KeysEventsService();
