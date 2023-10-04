import { ipcMain, dialog } from 'electron'
import { LogEntryService } from '../services/logEntryService'

export default function registerEventHandlers() {
  let logEntryService = new LogEntryService()

  ipcMain.handle('dialog', (event, method, params) => {
    dialog[method](params)
  })

  ipcMain.handle('getData', (event) => {
    return logEntryService.getLastYearLogEntries()
  })

  ipcMain.handle('getLogForDate', (event, selectedDate) => {
    return logEntryService.getLogEntry(selectedDate)
  })

  ipcMain.handle('setData', (event, input) => {
    logEntryService.addOrUpdateLog(input)
  })
}
