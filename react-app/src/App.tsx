import { ContributionCalendar } from 'react-contribution-calendar'

function App() {

  let data : InputData[] = [
    {
      '2023-09-07': { level: 2 }
    },
    {
      '2023-09-10': { level: 1 },
    },
    {
      '2023-09-11': { level: 4},
    }
  ]

return (
<div className="contributionCalendar"> 
<h1>Contribution Calendar</h1>
<ContributionCalendar
  data={data}
  start="2022-09-09"
  end="2023-09-09"
  daysOfTheWeek={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
  textColor="#1F2328"
  startsOnSunday={true}
  includeBoundary={true}
  theme="grass"
  cx={10}
  cy={10}
  cr={2}
  onCellClick={(e, data) => console.log(data)}
  scroll={false}
  style={{}}
/> </div>)
}

export default App;
