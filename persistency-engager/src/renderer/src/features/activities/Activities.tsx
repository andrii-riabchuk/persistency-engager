import { loadData } from '@renderer/ActivityLog'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import React, { useEffect, useState } from 'react'
import {
  selectActivityNames,
  selectContributionData,
  setContributionData,
  setCurrentActivity
} from '../contribution-calendar/contributionCalendarSlice'
import ContributionCalendarComponent from '@renderer/ContributionCalendarComponent/ContributionCalendarComponent'

import styles from './Activities.module.css'
import { setRoute } from '../route/routerSlice'

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
      <a
        onClick={(e) => {
          dispatch(setRoute('/'))
        }}
      >
        MainPage
      </a>
      <h2>Activities</h2>

      <ul>
        {activities.map((activityName) => (
          <li
            key={activityName}
            onClick={(e) => {
              dispatch(setCurrentActivity(activityName))
              dispatch(setRoute('/'))
            }}
          >
            <div className={styles.card}>
              <b>{activityName}</b>
              <ContributionCalendarComponent activityName={activityName} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
