import { BaseSyntheticEvent, useEffect, useState } from 'react'

export interface LogTodayEntry {
  content: string
  level: number
  activityType: number
}

export default function LogToday({
  readOnly,
  initialValue = '',
  selectedDate,
  selectTodayDate,
  onLogContentUpdate
}) {
  let [logContentText_, setLogContentText] = useState(initialValue)

  useEffect(() => {
    setLogContentText(initialValue)
  }, [initialValue])

  function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault()
    if (readOnly) selectTodayDate()
    else {
      const formJson = Object.fromEntries(new FormData(e.target).entries())
      let logContentText = formJson['logEntry'].toString()
      if (logToday(logContentText)) onLogContentUpdate(logContentText)
    }
  }

  function logToday(text): boolean {
    if (text) {
      let input: LogTodayEntry = { content: text, level: 1, activityType: 1 }
      window.api.updateLogEntry(input)
    } else {
      const dialogConfig = {
        title: 'Fuck_U_Man',
        message: 'What is wrong with you?'
      }
      window.api.openDialog('showMessageBox', dialogConfig)

      return false
    }

    return true
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <h3>{selectedDate}</h3>
      <textarea
        name="logEntry"
        readOnly={readOnly}
        placeholder={readOnly ? undefined : "Today I've done..."}
        value={logContentText_}
        onChange={(e) => setLogContentText(e.target.value)}
        rows={5}
        cols={50}
      />
      <button type="submit">LogToday</button>
    </form>
  )
}
