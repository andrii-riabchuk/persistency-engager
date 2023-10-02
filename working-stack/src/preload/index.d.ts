import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      openDialog: (method: string, config: object) => Promise<any>
      getData: () => Promise<any>
      getLogForDate: (selectedDate: string) => Promise<any>
      updateLogEntry: (input: any) => void
    }
  }
}
