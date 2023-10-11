import { useEffect, useRef, useState } from 'react'
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
  selectedDate,
  content,
  selectTodayDate,
  onLogContentUpdate
}) {
  let [logContentText_, setLogContentText] = useState('')
  let [newContentState, setNewContentState] = useState(logContentText_)

  let logInputControl = useRef<Editor>(null)

  let setNewContentStateMeta = (obj) => {
    setNewContentState(obj)
  }

  useEffect(() => {
    setLogContentText(content)
  }, [content])

  function handleSubmit() {
    if (readOnly) {
      if (logInputControl.current) logInputControl.current.view.dom.focus()
      selectTodayDate()
    } else {
      if (tryLogToday(newContentState)) onLogContentUpdate()
    }
  }

  function tryLogToday(text): boolean {
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
          // key={selectedDate}
          _content={logContentText_}
          setLogContentState={setNewContentStateMeta}
          readOnly={readOnly}
          renameMe={logInputControl}
        ></TipTapEditor>

        <LogTodayButton onSubmit={handleSubmit} />
      </div>
    </>
  )
}
