import ContributionCalendarComponent from './ContributionCalendarComponent/ContributionCalendarComponent'
import LogToday from './LogToday/LogToday'
import { useEffect, useState } from 'react'

import timeUtils from '../../utils/time-utils'

function App() {
  let [YEAR_AGO, TODAY] = timeUtils.lastYearRangeFormatted()

  let [rerenderNeeded, setRerenderNeeded] = useState(false)

  let [selectedDate, setSelectedDate] = useState(TODAY)
  let [selectedDateContent, setSelectedDateContent] = useState({ content: '' })

  let updateSelectedDate = (date: string) => {
    setSelectedDate(date)
    console.log('updated selected date state', date)
    setRerenderNeeded(!rerenderNeeded)
  }

  let onLogContentUpdate = (contentText) => {
    console.log('TodayLogstate updated')

    setRerenderNeeded(!rerenderNeeded)
  }

  // useEffect(() => {
  //   window.api.getData().then((logEntries: any[]) => {
  //     var prepared = logEntries.map((row) => {
  //       return { [row.DateTime]: { level: row.Level } }
  //     })
  //     setContributionData(prepared)

  //     let selectedDayLog_ = logEntries.find((x) => x.DateTime == selectedDate)
  //     setSelectedDateContent({ ...selectedDateContent, content: selectedDayLog_?.Content })
  //   })
  // }, [selectedDate, rerenderNeeded])

  let onGraphCellClick = (dateSelected) => {
    console.log('AppComponent: onGraphCellClick; date selected:', dateSelected)
    setSelectedDate(dateSelected)
  }

  return (
    <div className="contributionCalendar">
      <h1>Coding</h1>
      <ContributionCalendarComponent onGraphCellClick={onGraphCellClick} />

      <LogToday
        key={selectedDate}
        selectedDate={selectedDate}
        initialValue={selectedDateContent.content}
        readOnly={selectedDate !== TODAY}
        onLogContentUpdate={onLogContentUpdate}
        selectTodayDate={() => updateSelectedDate(TODAY)}
      />
    </div>
  )
}

export default App
