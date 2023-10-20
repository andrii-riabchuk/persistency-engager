import { useEffect, useRef, useState } from 'react'
import TipTapEditor from './TipTapEditor'
import LogTodayButton from '@renderer/assets/LogTodayButton'
import { Editor } from '@tiptap/react'
import { tryLogToday } from './logTodayService'
import {
  selectLogContentEditable,
  selectLogContentForDate,
  selectPickedDate,
  setLogContentEditable,
  setTodayDate
} from '@renderer/features/contribution-calendar/contributionCalendarSlice'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import timeUtils from '../../../utils/time-utils'

export default function LogToday({ onLogContentUpdate }) {
  const dispatch = useAppDispatch()
  let [_, TODAY] = timeUtils.lastYearRangeFormatted()

  let selectedDate = useAppSelector(selectPickedDate)
  let content = useAppSelector((state) => selectLogContentForDate(state, selectedDate))
  let readOnly = selectedDate != TODAY

  let logContentEditable = useAppSelector(selectLogContentEditable)
  console.log(`logToday component with logContentText_${logContentEditable}`)
  // let [newContentState, setNewContentState] = useState(logContentText_)

  let logInputControl = useRef<Editor>(null)

  // let setNewContentStateMeta = (obj) => {
  //   setNewContentState(obj)
  // }

  useEffect(() => {
    console.log('useEffect setLogContentText')
    dispatch(setLogContentEditable(content))
  }, [content])

  function handleSubmit() {
    if (readOnly) {
      if (logInputControl.current) logInputControl.current.view.dom.focus()
      dispatch(setTodayDate())
    } else {
      if (tryLogToday(logContentEditable)) onLogContentUpdate()
    }
  }

  return (
    <>
      <h3>{selectedDate}</h3>
      <div className="logTodayForm">
        <TipTapEditor
          logContent={content}
          readOnly={readOnly}
          refForAutoFocus={logInputControl}
        ></TipTapEditor>

        <LogTodayButton onSubmit={handleSubmit} />
      </div>
    </>
  )
}
