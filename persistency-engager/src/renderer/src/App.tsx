import ContributionCalendarComponent from './ContributionCalendarComponent/ContributionCalendarComponent'
import LogToday from './LogToday/LogToday'
import { useEffect, useState } from 'react'

import { selectActivityName, setActivityName } from '@renderer/features/settings/settingsSlice'
import {
  setContributionData,
  setTodayDate
} from '@renderer/features/contribution-calendar/contributionCalendarSlice'

import { useAppSelector, useAppDispatch } from '@renderer/app/hooks'
import { Settings } from './features/settings/Settings'

function App() {
  const activityName = useAppSelector(selectActivityName)
  const dispatch = useAppDispatch()

  let [calendarRender, setCalendarRender] = useState(0)
  let rerenderCalendar = () => setCalendarRender(calendarRender + 1)

  useEffect(() => {
    loadData((data) => {
      dispatch(setContributionData(data))
    })
  }, [calendarRender])

  useEffect(() => {
    dispatch(setActivityName('@Coding@'))
    dispatch(setTodayDate())
  }, [])

  return (
    <div className="contributionCalendar">
      <a href="/">Activities</a>
      <h1>
        {activityName}
        <div style={{ float: 'right' }}>
          <Settings />
        </div>
      </h1>
      <ContributionCalendarComponent key={calendarRender} activityName={activityName} />
      <LogToday onLogContentUpdate={rerenderCalendar} />
    </div>
  )
}

export function loadData(callBack: (data: object) => void) {
  window.api.getData().then((logEntriesGrouped: any[]) => {
    callBack(logEntriesGrouped)
  })
}

export default App
