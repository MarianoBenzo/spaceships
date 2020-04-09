import SocketService from "./SocketService";

class KeysEventsService {

  initialize() {
    this.addKeysDownListener();
    this.addKeysUpListener();
  }

  addKeysDownListener() {
    window.addEventListener("keydown", event => {
      if (event.keyCode === 37) {
        // Key: A
        SocketService.emitRotatingLeft(true);
        event.preventDefault();
      }
      else if (event.keyCode === 38) {
        // Key: W
        SocketService.emitAccelerating(true);
        event.preventDefault();
      }
      else if (event.keyCode === 39) {
        // Key: D
        SocketService.emitRotatingRight(true);
        event.preventDefault();
      }
      else if (event.keyCode === 40) {
        // Key: S
        SocketService.emitDecelerating(true);
        event.preventDefault();
      }
    });
  }

  addKeysUpListener() {
    window.addEventListener("keyup", event => {
      if (event.keyCode === 37) {
        // Key: A
        console.log("keyup A");
        SocketService.emitRotatingLeft(false);
        event.preventDefault();
      }
      else if (event.keyCode === 38) {
        // Key: W
        SocketService.emitAccelerating(false);
        event.preventDefault();
      }
      else if (event.keyCode === 39) {
        // Key: D
        SocketService.emitRotatingRight(false);
        event.preventDefault();
      }
      else if (event.keyCode === 40) {
        // Key: S
        SocketService.emitDecelerating(false);
        event.preventDefault();
      }
    });
  }
}

export default new KeysEventsService();
