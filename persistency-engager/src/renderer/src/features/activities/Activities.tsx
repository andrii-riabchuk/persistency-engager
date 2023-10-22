import { loadData } from '@renderer/App'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import React, { useEffect, useState } from 'react'
import {
  selectActivityNames,
  selectContributionData,
  setContributionData
} from '../contribution-calendar/contributionCalendarSlice'
import ContributionCalendarComponent from '@renderer/ContributionCalendarComponent/ContributionCalendarComponent'

export default function Activities() {
  const dispatch = useAppDispatch()

  let activities = useAppSelector(selectActivityNames)

  useEffect(() => {
    loadData((data) => {
      dispatch(setContributionData(data))
    })
  }, [])

  return (
    <div>
      <a href="/app">MainPage</a>
      <h2>Activities</h2>

      <ul>
        {activities.map((activityName) => (
          <div key={activityName}>
            <li>{activityName}</li>
            <ContributionCalendarComponent activityName={activityName} />
          </div>
        ))}
      </ul>
    </div>
  )
}
