import { ContributionCalendar } from 'react-contribution-calendar'
import LogToday from './LogToday/LogToday'
import { useEffect, useState } from 'react'

import timeUtils from '../../utils/time-utils'

function App() {
  const [YEAR_AGO, TODAY] = timeUtils.lastYearRangeFormatted()

  const [rerenderNeeded, setRerenderNeeded] = useState(false)

  const [contributionData, setContributionData] = useState(Array<InputData>)
  const [selectedDate, setSelectedDate] = useState(TODAY)
  const [selectedDateContent, setSelectedDateContent] = useState({ content: '' })

  const updateSelectedDate = (date: string) => {
    setSelectedDate(date)
    console.log('updated selected date state', date)
    setRerenderNeeded(!rerenderNeeded)
  }

  const onLogContentUpdate = (_) => {
    console.log('TodayLogstate updated')

    setRerenderNeeded(!rerenderNeeded)
  }

  useEffect(() => {
    window.api.getData().then((logEntries: any[]) => {
      const prepared = logEntries.map((row) => {
        return { [row.DateTime]: { level: row.Level } }
      })
      setContributionData(prepared)

      const selectedDayLog_ = logEntries.find((x) => x.DateTime == selectedDate)
      setSelectedDateContent({ ...selectedDateContent, content: selectedDayLog_?.Content })
    })
  }, [selectedDate, rerenderNeeded])

  return (
    <div className="contributionCalendar">
      <h1>Contribution Calendar</h1>
      <ContributionCalendar
        data={contributionData}
        start={YEAR_AGO}
        end={TODAY}
        daysOfTheWeek={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
        textColor="#1F2328"
        startsOnSunday={true}
        includeBoundary={true}
        theme="grass"
        cx={10}
        cy={10}
        cr={2}
        onCellClick={(_e, data) => updateSelectedDate(data!.date)}
        scroll={false}
        style={{}}
      />

      <LogToday
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
