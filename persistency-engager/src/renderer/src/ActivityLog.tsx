import ContributionCalendarComponent from './ContributionCalendarComponent/ContributionCalendarComponent'
import LogToday from './LogToday/LogToday'
import { useEffect, useState } from 'react'

import { setActivityName } from '@renderer/features/settings/settingsSlice'
import {
  selectCurrentActivity,
  setTodayDate
} from '@renderer/features/contribution-calendar/contributionCalendarSlice'

import { useAppSelector, useAppDispatch } from '@renderer/app/hooks'
import { Settings } from './features/settings/Settings'
import { setRoute } from './features/route/routerSlice'

function ActivityLog() {
  const dispatch = useAppDispatch()

  const activity = useAppSelector(selectCurrentActivity)

  let [calendarRender, setCalendarRender] = useState(0)
  let rerenderCalendar = () => setCalendarRender(calendarRender + 1)

  useEffect(() => {
    // loadData((data) => {
    //   let preparedData = data.reduce((res, cur) => {
    //     res[cur.DateTime] = cur
    //   }, {})
    //   dispatch(setContributionData(preparedData))
    // })
  }, [calendarRender])

  useEffect(() => {
    dispatch(setActivityName('@Coding@'))
    dispatch(setTodayDate())
  }, [])

  return (
    <div className="contributionCalendar">
      <a
        onClick={(e) => {
          dispatch(setRoute('/activities'))
        }}
      >
        Activities
      </a>
      <h1>
        {activity}
        <div style={{ float: 'right' }}>
          <Settings />
        </div>
      </h1>
      <ContributionCalendarComponent key={calendarRender} activityName={activity} />
      <LogToday onLogContentUpdate={rerenderCalendar} />
    </div>
  )
}

export function loadData(callBack: (data: any[]) => void) {
  window.api.getData().then((logEntriesGrouped: any[]) => {
    callBack(logEntriesGrouped)
  })
}

export default ActivityLog
