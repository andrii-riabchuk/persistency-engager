import { ContributionCalendar } from 'react-contribution-calendar'
import LogToday from './LogToday/LogToday';
import { useEffect, useState } from 'react'

function lastYearRange(): Date[] {
  let today = new Date()

  let todayYearAgo = new Date()
  todayYearAgo.setFullYear(today.getFullYear() - 1)

  return [todayYearAgo, today]
}

function App() {
  let [contributionData, setContributionData] = useState(Array<InputData>)
  let [todayLog, setTodayLog] = useState('')

  let updateLogState = (content) => {
    console.log('state updated')
    setTodayLog(content)
  }

  useEffect(() => {
    window.api.getData().then((res) => {
      let [logEntries, todayLog_] = res

      setContributionData(logEntries)
      setTodayLog(todayLog_?.Content)
    })
  }, [todayLog])

  let [yearAgo, today] = lastYearRange().map((date) => date.toISOString().slice(0, 10))

  return (
    <div className="contributionCalendar">
      <h1>Contribution Calendar</h1>
      <ContributionCalendar
        data={contributionData}
        start={yearAgo}
        end={today}
        daysOfTheWeek={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
        textColor="#1F2328"
        startsOnSunday={true}
        includeBoundary={true}
        theme="grass"
        cx={10}
        cy={10}
        cr={2}
        onCellClick={(e, data) => console.log(e, data)}
        scroll={false}
        style={{}}
      />

      <LogToday initialValue={todayLog} onLogContentUpdate={updateLogState} />
    </div>
  )
}

export default App;
