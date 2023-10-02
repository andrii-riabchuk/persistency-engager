import ContributionCalendarComponent from './ContributionCalendarComponent/ContributionCalendarComponent'
import LogToday from './LogToday/LogToday'
import { useEffect, useState } from 'react'

import timeUtils from '../../utils/time-utils'

function App() {
  let [YEAR_AGO, TODAY] = timeUtils.lastYearRangeFormatted()

  let [selectedDate, setSelectedDate] = useState(TODAY)

  let [calendarRender, setCalendarRender] = useState(0)
  let rerenderCalendar = () => setCalendarRender(calendarRender + 1)

  return (
    <div className="contributionCalendar">
      <h1>Coding</h1>
      <ContributionCalendarComponent key={calendarRender} onGraphCellClick={setSelectedDate} />

      <LogToday
        key={selectedDate}
        selectedDate={selectedDate}
        readOnly={selectedDate !== TODAY}
        onLogContentUpdate={rerenderCalendar}
        selectTodayDate={() => setSelectedDate(TODAY)}
      />
    </div>
  )
}

export default App
