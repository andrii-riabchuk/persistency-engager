import { ContributionCalendar } from 'react-contribution-calendar'
import LogToday from './LogToday/LogToday';
import { useEffect, useState } from 'react'

function lastYearRange(): Date[] {
  let today = new Date()

  let todayYearAgo = new Date()
  todayYearAgo.setFullYear(today.getFullYear() - 1)

  return [todayYearAgo, today]
}

function formatDate(dateTime: Date): string {
  return dateTime.toISOString().slice(0, 10)
}

function App() {
  let [YEAR_AGO, TODAY] = lastYearRange().map(formatDate)

  let [contributionData, setContributionData] = useState(Array<InputData>)
  let [todayLog, setTodayLog] = useState('')

  let updateLogState = (content) => {
    console.log('TodayLogstate updated')
    setTodayLog(content)
  }

  useEffect(() => {
    window.api.getData().then((logEntries: any[]) => {
      var prepared = logEntries.map((row) => {
        return { [row.DateTime]: { level: row.Level } }
      })
      setContributionData(prepared)
      let todayLog = logEntries.find((x) => x.DateTime == TODAY)
      setTodayLog(todayLog?.Content)
    })
  }, [todayLog])

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
        onCellClick={(e, data) => console.log(e, data)}
        scroll={false}
        style={{}}
      />

      <LogToday initialValue={todayLog} onLogContentUpdate={updateLogState} />
    </div>
  )
}

export default App;
