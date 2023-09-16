import { ipcMain, dialog } from 'electron'
import { LogEntryService } from '../services/logEntryService'

export default function registerEventHandlers() {
  const logEntryService = new LogEntryService()

  ipcMain.handle('dialog', (_, method, params) => {
    dialog[method](params)
  })

  ipcMain.handle('getData', (_) => {
    return logEntryService.getLastYearLogEntries()
  })

  ipcMain.handle('setData', (_, input) => {
    logEntryService.addOrUpdateLog(input)
  })
}
