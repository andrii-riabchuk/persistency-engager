import ContributionCalendarComponent from './ContributionCalendarComponent/ContributionCalendarComponent'
import LogToday from './LogToday/LogToday'
import { useEffect, useState } from 'react'

import timeUtils from '../../utils/time-utils'

import { selectActivityName, setActivityName } from '@renderer/features/settings/settingsSlice'
import { useAppSelector, useAppDispatch } from '@renderer/app/hooks'
import { Settings } from './features/settings/Settings'

function App() {
  const activityName = useAppSelector(selectActivityName)
  const dispatch = useAppDispatch()

  let [_, TODAY] = timeUtils.lastYearRangeFormatted()

  let [selectedDate, setSelectedDate] = useState(TODAY)
  let [contributionData, setContributionData] = useState({})

  let [calendarRender, setCalendarRender] = useState(0)
  let rerenderCalendar = () => setCalendarRender(calendarRender + 1)

  useEffect(() => {
    window.api.getData().then((logEntries: any[]) => {
      let hashMap = {}
      logEntries.forEach((row) => {
        hashMap[row.DateTime] = row
      })
      setContributionData(hashMap)
    })
  }, [calendarRender])

  useEffect(() => {
    window.api.getActivityName().then((name) => {
      dispatch(setActivityName(name))
    })
  }, [])

  return (
    <div className="contributionCalendar">
      <h1>
        {activityName + '      '}
        <div style={{ float: 'right' }}>
          <Settings />
        </div>
      </h1>
      <ContributionCalendarComponent key={calendarRender} onGraphCellClick={setSelectedDate} />
      <LogToday
        selectedDate={selectedDate}
        readOnly={selectedDate !== TODAY}
        content={contributionData[selectedDate]?.Content ?? ''}
        onLogContentUpdate={rerenderCalendar}
        selectTodayDate={() => setSelectedDate(TODAY)}
      />
    </div>
  )
}

export default App
