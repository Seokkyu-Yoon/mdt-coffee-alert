const path = require('path')
const MainWindow = require('./window')
const { app, Tray, ipcMain, screen } = require('electron')

let mainWindow
let tray

app.whenReady().then(() => {
  tray = new Tray(path.resolve(__dirname, '../assets/logo.png'))
  mainWindow = new MainWindow()

  tray.on('click', () => {
    mainWindow = new MainWindow()
  })
  tray.on('right-click', () => {
    app.quit()
  })

  ipcMain.on('winState:move', (e, payload) => {
    const { x: sx, y: sy } = screen?.getCursorScreenPoint?.() || {}

    if (!mainWindow) return

    const { clientX, clientY } = payload || {}
    const x = sx - clientX
    const y = sy - clientY
    mainWindow.setPosition(x, y)
  })

  ipcMain.on('winState:close', (e, payload) => {
    mainWindow.close()
  })
  ipcMain.on('winState:alwaysOnTop', (e, payload) => {
    mainWindow.setAlwaysOnTop(payload)
  })
  ipcMain.on('winState:resize', (e, payload) => {
    mainWindow.setBounds(payload)
  })
})

app.on('window-all-closed', (e) => {
  e?.stopPropagation?.()
})
