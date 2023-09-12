import { ipcMain, dialog } from 'electron'
import logEntryService from '../services/logEntryService'

export default function registerEventHandlers() {
  ipcMain.handle('dialog', (event, method, params) => {
    dialog[method](params)
  })

  ipcMain.handle('getData', (event) => {
    return logEntryService.getLogEntries()
  })

  ipcMain.handle('setData', (event, input) => {
    logEntryService.addOrUpdateLog(input)
  })
}
