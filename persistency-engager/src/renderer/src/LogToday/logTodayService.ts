export function tryLogToday(text): boolean {
  if (hasContent(text)) {
    let input: LogTodayEntry = { content: text, level: 1, activityType: 1 }
    window.api.updateLogEntry(input)
  } else {
    showWTFDialog()
    return false
  }

  return true
}

function showWTFDialog() {
  const DIALOG_TITLE = 'Fuck_U_Man'
  const DIALOG_MESSAGE = 'What is wrong with you?'

  window.api.openDialog('showMessageBox', { title: DIALOG_TITLE, message: DIALOG_MESSAGE })
}

function hasContent(content: string): boolean {
  const EMPTY_PARAGRAPH = '<p></p>'
  if (content && content != EMPTY_PARAGRAPH) return true

  return false
}

export interface LogTodayEntry {
  content: string
  level: number
  activityType: number
}
