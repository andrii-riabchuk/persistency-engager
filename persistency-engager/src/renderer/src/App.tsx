import { useAppSelector } from './app/hooks'
import { selectRoute } from './features/route/routerSlice'
import Activities from './features/activities/Activities'
import ActivityLog from './ActivityLog'

export default function App() {
  let route = useAppSelector(selectRoute)
  if (route == '') route = '/activities'

  return route == '/activities' ? <Activities /> : <ActivityLog />
}
