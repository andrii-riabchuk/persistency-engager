import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import timeUtils from '../../../../utils/time-utils'

export interface ContributionCalendarState {
  currentActivity: string
  pickedDate: string
  contributionData: object
  logContentEditable: string
}

const initialState: ContributionCalendarState = {
  currentActivity: '',
  pickedDate: '',
  contributionData: {},
  logContentEditable: ''
}

export const contributionCalendarSlice = createSlice({
  name: 'contributionCalendar',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCurrentActivity: (state, action: PayloadAction<string>) => {
      state.currentActivity = action.payload
    },
    setTodayDate: (state) => {
      let [_, TODAY] = timeUtils.lastYearRangeFormatted()
      state.pickedDate = TODAY
    },
    setPickedDate: (state, action: PayloadAction<string>) => {
      state.pickedDate = action.payload
    },
    setLogContentEditable: (state, action: PayloadAction<string>) => {
      state.logContentEditable = action.payload
    },
    setContributionData: (state, action: PayloadAction<object>) => {
      state.contributionData = action.payload
    }
  }
})

export const {
  setCurrentActivity,
  setPickedDate,
  setTodayDate,
  setLogContentEditable,
  setContributionData
} = contributionCalendarSlice.actions

export const selectCurrentActivity = (state: RootState) =>
  state.contributionCalendar.currentActivity
  
export const selectPickedDate = (state: RootState) => state.contributionCalendar.pickedDate
export const selectLogContentEditable = (state: RootState) =>
  state.contributionCalendar.logContentEditable

export const selectLogContentForDate = (state: RootState, date: string) => {
  let data = state.contributionCalendar.contributionData
  return data[date]?.Content
}

export const selectActivityNames = (state: RootState) => {
  if (
    state.contributionCalendar.contributionData &&
    state.contributionCalendar.contributionData['activityTypes']
  )
    return state.contributionCalendar.contributionData['activityTypes'].map((x) => x.name)
  return []
}

export const selectContributionData = (state: RootState, activityName: string) => {
  console.log('slice', activityName)
  let data = state.contributionCalendar.contributionData
  if (data && data[activityName]) return data[activityName]
  return []
}
export default contributionCalendarSlice.reducer
