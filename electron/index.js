const path = require('path')
const MainWindow = require('./window')
const { app, Tray, nativeImage, ipcMain } = require('electron')
const { electron } = require('process')

let mainWindow
let tray

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath('../assets/logo.png')
  tray = new Tray(icon)
  mainWindow = new MainWindow()

  tray.on('click', () => {
    mainWindow = new MainWindow()
  })

  ipcMain.on('winState:move', (e, payload) => {
    if (!mainWindow) return
    const [mxc, myc] = electron.screen.getCursorScreenPoint()
    const { dx, dy } = payload
    // const [w, h] = mainWindow.getSize()
    const [x, y] = mainWindow.getPosition()
    mainWindow.setPosition(x + dx, y + dy)
    // mainWindow.setSize(w, h)
  })
})
