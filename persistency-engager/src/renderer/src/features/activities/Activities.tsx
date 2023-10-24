import { loadData } from '@renderer/ActivityLog'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import React, { useEffect, useState } from 'react'
import {
  selectActivityNames,
  selectContributionData,
  selectContributionDataForCalendar,
  setContributionData,
  setContributionDataForCalendar,
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
      let dataForCalendar = { activityTypes: data.activityTypes }
      let dataForLogs = { activityTypes: data.activityTypes }

      function formatAppropriately(arr: any[]) {
        let result = arr.reduce((res, cur) => {
          res[cur.DateTime] = cur
          return res
        }, {})

        return result
      }

      for (let i = 0; i < data.activityTypes.length; i++) {
        let activityType = data.activityTypes[i]['name']
        dataForLogs[activityType] = formatAppropriately(data[activityType])
        dataForCalendar[activityType] = data[activityType].map((row) => {
          return { [row.DateTime]: { level: row.Level } }
        })
      }

      // let preparedData = data.reduce((res, cur) => {
      //   res[cur.DateTime] = cur
      // }, {})
      dispatch(setContributionDataForCalendar(dataForCalendar))
      dispatch(setContributionData(dataForLogs))
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
