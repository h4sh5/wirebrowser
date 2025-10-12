import { ipcMain } from "electron";

class UIEvents {
  listeners = {}
  queue = new Set();
  rendererReady = false;

  constructor(window) {
    this.window = window;
    ipcMain.on('send-message', (event, msg) => {
      if (msg.event in this.listeners) {
        this.listeners[msg.event](msg.data, (event, data) => {
          this.dispatch(event, data, msg.sessionId);
        });
      }
    });
    ipcMain.on('renderer-ready', (event, msg) => {
      for (const mess of this.queue) {
        this.window.webContents.send('on-message', mess);
        this.queue.delete(mess);
      }
      this.rendererReady = true;
    });
  }

  on = (event, callback) => {
    this.listeners[event] = callback;
  }

  off = (event) => {
    delete this.listeners[event];
  }

  dispatch = (event, data, sessionId) => {
    const mess = { event, data, sessionId};
    if (this.rendererReady) {
      this.window.webContents.send('on-message', mess);
    } else {
      this.queue.add(mess);
    }
  }

  getRegisteredEvents = () => {
    return Object.keys(this.listeners);
  }
}

export default UIEvents;