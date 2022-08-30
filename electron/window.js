const path = require('path')
const { BrowserWindow } = require('electron')


const isDev = process.env.NODE_ENV === 'development'

let window = null;
let savedPosition = { x: undefined, y: undefined }
class MainWindow extends BrowserWindow {
  constructor() {
    if (window) return window
    super({
      width: 300,
      height: 200,
      x: savedPosition.x,
      y: savedPosition.y,
      transparent: true,
      frame: false,
      minimizable: false,
      maximizable: false,
      resizable: false,
      moveable: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true
      },
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
    this.setPosition.apply(this, this.getPosition())
    window = this
  }

  setPosition(x, y) {
    super.setPosition(x, y)
    savedPosition.x = x
    savedPosition.y = y
  }
}

module.exports = MainWindow