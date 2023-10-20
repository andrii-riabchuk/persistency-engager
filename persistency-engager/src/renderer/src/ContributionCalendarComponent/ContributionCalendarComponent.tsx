import { useEffect, useState } from 'react'
import { ContributionCalendar } from 'react-contribution-calendar'
import timeUtils from '../../../utils/time-utils'
import './ContributionCalendarComponent.css'
import { setPickedDate } from '@renderer/features/contribution-calendar/contributionCalendarSlice'
import { useAppDispatch } from '@renderer/app/hooks'

export default function ContributionCalendarComponent() {
  const dispatch = useAppDispatch()

  let [YEAR_AGO, TODAY] = timeUtils.lastYearRangeFormatted()

  let [contributionData, setContributionData] = useState(Array<InputData>)

  useEffect(() => {
    window.api.getData().then((logEntries: any[]) => {
      var prepared = logEntries.map((row) => {
        return { [row.DateTime]: { level: row.Level } }
      })
      setContributionData(prepared)
      focusTodayCell()
    })
  }, [])

  function onCellClick(data) {
    let dateSelected = data!.date
    dispatch(setPickedDate(dateSelected))
  }

  return (
    <>
      <div className="activity-graph" onKeyDown={controlCalendarWithArrowKeys}>
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
          onCellClick={(e, data) => onCellClick(data)}
          scroll={false}
          style={{}}
        />
      </div>
    </>
  )
}

//Probably unsafe code, but IDK
function focusTodayCell() {
  function formatDate(date) {
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }

    return date.toLocaleDateString('en-US', options)
  }

  const date = new Date()
  const formattedDate = formatDate(date)

  let nodeList = document.querySelectorAll(`[data-tooltip="${formattedDate}"]`)
  if (nodeList) {
    let todayCell = nodeList[0]
    ;(todayCell as HTMLElement)?.focus()
  }
}

function controlCalendarWithArrowKeys(e) {
  // quit if not arrow key
  let code = e.which
  if (![37, 38, 39, 40].includes(code)) return

  // Day - along column
  // up arrow ↑
  if (code == 38) {
    let row = e.target.parentNode
    let table = row.parentNode

    let cellIndex = e.target.cellIndex
    let rowIndex = row.rowIndex - 1
    if (rowIndex == 0) {
      rowIndex = table.rows.length
      cellIndex -= 1
    }
    let previousDayCell = table.rows[rowIndex - 1].cells[cellIndex]
    previousDayCell.click(), previousDayCell.focus()
  }
  // down arrow ↓
  if (code == 40) {
    let row = e.target.parentNode
    let table = row.parentNode

    let cellIndex = e.target.cellIndex
    let rowIndex = row.rowIndex - 1
    if (rowIndex == table.rows.length - 1) {
      cellIndex += 1
      rowIndex = -1
    }
    let nextDayCell = table.rows[rowIndex + 1].cells[cellIndex]
    nextDayCell.click(), nextDayCell.focus()
  }

  // Week - along row
  // left arrow ←
  if (code == 37) {
    let prevWeekCell = e.target.previousSibling
    if (prevWeekCell.getAttribute('data-tooltip')) {
      prevWeekCell.focus()
      prevWeekCell.click()
    }
  }
  // right arrow →
  if (code == 39) {
    let nextWeekCell = e.target.nextSibling
    if (nextWeekCell.getAttribute('data-tooltip')) {
      nextWeekCell.focus()
      nextWeekCell.click()
    }
  }
}
