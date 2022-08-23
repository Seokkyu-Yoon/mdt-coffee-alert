const path = require('path')
const { BrowserWindow } = require('electron')


const isDev = process.env.NODE_ENV === 'development'

let window = null;
class MainWindow extends BrowserWindow {
  constructor() {
    if (window) return window
    super({
      width: 800,
      height: 600,
      resizable: false,
      frame: false,
      moveable: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true
      }
    })

    if (isDev) {
      this.loadURL('http://localhost:23600')
      this.webContents.openDevTools()
    } else {
      this.loadFile('./dist/index.html')
    }

    this.on('close', () => {
      window = null
    })

    window = this
  }
}

module.exports = MainWindow