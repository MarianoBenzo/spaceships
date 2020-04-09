import SocketService from "./SocketService";

class KeysEventsService {
  aDown: boolean;
  wDown: boolean;
  dDown: boolean;
  sDown: boolean;

  initialize() {
    this.aDown = false;
    this.wDown = false;
    this.dDown = false;
    this.sDown = false;

    this.addKeysDownListener();
    this.addKeysUpListener();
  }

  addKeysDownListener() {
    window.addEventListener("keydown", event => {
      if ((event.key === 'a' || event.key === 'ArrowLeft') && !this.aDown) {
        this.aDown = true;
        SocketService.emitRotatingLeft(true);
        event.preventDefault();
      }
      else if ((event.key === 'w' || event.key === 'ArrowUp') && !this.wDown) {
        this.wDown = true;
        SocketService.emitAccelerating(true);
        event.preventDefault();
      }
      else if ((event.key === 'd' || event.key === 'ArrowRight') && !this.dDown) {
        this.dDown = true;
        SocketService.emitRotatingRight(true);
        event.preventDefault();
      }
      else if ((event.key === 's' || event.key === 'ArrowDown') && !this.sDown) {
        this.sDown = true;
        SocketService.emitDecelerating(true);
        event.preventDefault();
      }
    });
  }

  addKeysUpListener() {
    window.addEventListener("keyup", event => {
      if (event.key === 'a' || event.key === 'ArrowLeft') {
        this.aDown = false;
        SocketService.emitRotatingLeft(false);
        event.preventDefault();
      }
      else if (event.key === 'w' || event.key === 'ArrowUp') {
        this.wDown = false;
        SocketService.emitAccelerating(false);
        event.preventDefault();
      }
      else if (event.key === 'd' || event.key === 'ArrowRight') {
        this.dDown = false;
        SocketService.emitRotatingRight(false);
        event.preventDefault();
      }
      else if (event.key === 's' || event.key === 'ArrowDown') {
        this.sDown = false;
        SocketService.emitDecelerating(false);
        event.preventDefault();
      }
    });
  }
}

export default new KeysEventsService();
