import { useEffect, useRef, useState } from 'react'
import TipTapEditor from './TipTapEditor'
import LogTodayButton from '@renderer/assets/LogTodayButton'
import { Editor } from '@tiptap/react'
import { tryLogToday } from './logTodayService'

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

  return (
    <>
      <h3>{selectedDate}</h3>
      <div className="logTodayForm">
        <TipTapEditor
          _content={logContentText_}
          setLogContentState={setNewContentStateMeta}
          readOnly={readOnly}
          refForAutoFocus={logInputControl}
        ></TipTapEditor>

        <LogTodayButton onSubmit={handleSubmit} />
      </div>
    </>
  )
}
