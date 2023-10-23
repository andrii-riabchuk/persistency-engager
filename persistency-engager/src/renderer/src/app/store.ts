import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/settings/settingsSlice'
import contributionCalendarReducer from '@renderer/features/contribution-calendar/contributionCalendarSlice'
import routerReducer from '../features/route/routerSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    contributionCalendar: contributionCalendarReducer,
    router: routerReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
