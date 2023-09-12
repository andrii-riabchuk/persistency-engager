import { BaseSyntheticEvent } from 'react';

export interface LogTodayEntry {
  content: string
  level: number
  activityType: number
}

export default function LogToday(props) {
  function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault()

    const formJson = Object.fromEntries(new FormData(e.target).entries())
    logToday(formJson['logEntry'])
    let callBack = props.onLogContentUpdate
    console.log('calling callback', callBack, 'with args', formJson['logEntry'])
    if (callBack) callBack(formJson['logEntry'])
  }

  function logToday(text) {
    if (text) {
      let input: LogTodayEntry = { content: text, level: 1, activityType: 1 }
      window.api.updateLogEntry(input)
    }
    // empty text shouldn't be logged
    else {
      const dialogConfig = {
        title: 'Fuck_U_Man',
        message: 'What is wrong with you?'
      }
      window.api.openDialog('showMessageBox', dialogConfig)
    }
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <textarea
        name="logEntry"
        placeholder={"Today I've done..."}
        defaultValue={props.initialValue}
        rows={5}
        cols={50}
      />
      <button type="submit">LogToday</button>
    </form>
  )
}