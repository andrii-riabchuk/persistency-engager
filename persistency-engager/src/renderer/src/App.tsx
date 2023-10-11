import ContributionCalendarComponent from './ContributionCalendarComponent/ContributionCalendarComponent'
import LogToday from './LogToday/LogToday'
import { useEffect, useState } from 'react'

import timeUtils from '../../utils/time-utils'
import { SettingsModal } from './SettingsModal/SettingsModal'

function App() {
  let [activityName, setActivityName] = useState('')

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
    window.api.getActivityName().then(setActivityName)
  }, [])

  return (
    <div className="contributionCalendar">
      <h1>
        {activityName + '      '}
        <div style={{ float: 'right' }}>
          <SettingsModal activityName={activityName} setActivityName={setActivityName} />
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
