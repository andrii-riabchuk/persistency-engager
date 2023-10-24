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
      console.log('useeffect_Activities', data)
      function formatAppropriately(arr: any[]) {
        let result = arr.reduce((res, cur) => {
          res[cur.DateTime] = cur
          return res
        }, {})

        return result
      }

      for (let i = 0; i < data.activityTypes.length; i++) {
        let activityType = data.activityTypes[i]['name']
        data[activityType] = formatAppropriately(data[activityType])
      }

      // let preparedData = data.reduce((res, cur) => {
      //   res[cur.DateTime] = cur
      // }, {})
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
