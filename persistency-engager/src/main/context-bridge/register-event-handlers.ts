import { ipcMain, dialog } from 'electron'
import { LogEntryService } from '../services/logEntryService'

export default function registerEventHandlers() {
  let logEntryService = new LogEntryService()

  ipcMain.handle('dialog', (event, method, params) => {
    dialog[method](params)
  })

  ipcMain.handle('getActivityName', (event) => {
    return logEntryService.getActivityName()
  })

  ipcMain.handle('setActivityName', (event, newName) => {
    return logEntryService.updateActivityName(newName)
  })

  ipcMain.handle('getData', (event, forActivity) => {
    return logEntryService.getLastYearLogEntries(forActivity)
  })

  ipcMain.handle('setData', (event, input) => {
    logEntryService.addOrUpdateLog(input)
  })
}
