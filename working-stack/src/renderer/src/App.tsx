import ContributionCalendarComponent from './ContributionCalendarComponent/ContributionCalendarComponent'
import LogToday from './LogToday/LogToday'
import { useEffect, useState } from 'react'

import timeUtils from '../../utils/time-utils'

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
