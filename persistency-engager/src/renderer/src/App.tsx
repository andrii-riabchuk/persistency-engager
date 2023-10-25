import React from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { selectCurrentActivity } from './features/contribution-calendar/contributionCalendarSlice'
import { selectRoute } from './features/route/routerSlice'
import Activities from './features/activities/Activities'
import ActivityLog from './ActivityLog'

export default function App() {
  const dispatch = useAppDispatch()

  const activity = useAppSelector(selectCurrentActivity)
  let route = useAppSelector(selectRoute)
  if (route == '') route = '/activities'

  return route == '/activities' ? <Activities /> : <ActivityLog />
}
