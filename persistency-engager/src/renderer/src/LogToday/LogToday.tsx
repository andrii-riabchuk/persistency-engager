import { useEffect, useRef } from 'react'
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
import { setShouldFocusEditor } from '@renderer/features/logToday/logTodaySlice'

export default function LogToday({ onLogContentUpdate }) {
  const dispatch = useAppDispatch()
  const [_, TODAY] = timeUtils.lastYearRangeFormatted()

  const selectedDate = useAppSelector(selectPickedDate)
  const content = useAppSelector((state) => selectLogContentForDate(state, selectedDate))
  const readOnly = selectedDate != TODAY

  const logContentEditable = useAppSelector(selectLogContentEditable)
  console.log(`logToday component with logContentText_${logContentEditable}`)
  // let [newContentState, setNewContentState] = useState(logContentText_)

  // let setNewContentStateMeta = (obj) => {
  //   setNewContentState(obj)
  // }

  useEffect(() => {
    dispatch(setLogContentEditable(content))
  }, [content])

  function handleSubmit() {
    if (readOnly) {
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
          onSubmit={handleSubmit}
        ></TipTapEditor>

        <LogTodayButton onSubmit={handleSubmit} />
      </div>
    </>
  )
}
