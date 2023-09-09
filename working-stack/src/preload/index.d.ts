import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      openDialog : (method: string, config: object) => Promise<any>
    }
  }
}
