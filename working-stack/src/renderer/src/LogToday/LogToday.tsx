import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react'
import TipTapEditor from './TipTapEditor'
import LogTodayButton from '@renderer/assets/LogTodayButton'
import { Editor } from '@tiptap/react'

export interface LogTodayEntry {
  content: string
  level: number
  activityType: number
}

function hasContent(content: string): boolean {
  const EMPTY_PARAGRAPH = '<p></p>'
  if (content && content != EMPTY_PARAGRAPH) return true

  return false
}

export default function LogToday({
  readOnly,
  initialValue = '',
  selectedDate,
  selectTodayDate,
  onLogContentUpdate
}) {
  let [logContentText_, setLogContentText] = useState(initialValue)
  let [newContentState, setNewContentState] = useState(logContentText_)

  let logInputControl = useRef<Editor>(null)
  console.log('LogTodayComponent', logContentText_)

  let setNewContentStateMeta = (obj) => {
    console.log('setnewcontentstatemeta', obj)
    setNewContentState(obj)
  }
  let [readOnlyState, setReadOnlyState] = useState(readOnly)

  useEffect(() => {
    setLogContentText(initialValue)
    setReadOnlyState(readOnly)
  }, [initialValue, readOnly])

  function handleSubmit() {
    console.log('handlesubmit')
    if (readOnly) {
      console.log('logInputControl', logInputControl.current)
      if (logInputControl.current) logInputControl.current.view.dom.focus()
      selectTodayDate()
    } else {
      if (logToday(newContentState)) onLogContentUpdate(newContentState)
    }
  }

  function logToday(text): boolean {
    if (hasContent(text)) {
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
    <>
      <h3>{selectedDate}</h3>
      <div className="logTodayForm">
        <TipTapEditor
          _content={logContentText_}
          setLogContentState={setNewContentStateMeta}
          readOnly={readOnlyState}
          renameMe={logInputControl}
        ></TipTapEditor>

        <LogTodayButton onSubmit={handleSubmit} />
      </div>
    </>
  )
}
