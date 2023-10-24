import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import timeUtils from '../../../../utils/time-utils'

export interface ContributionCalendarState {
  currentActivity: string
  pickedDate: string
  contributionData: object
  contributionDataForCalendar: object
  logContentEditable: string
}

const initialState: ContributionCalendarState = {
  currentActivity: '',
  pickedDate: '',
  contributionData: {},
  contributionDataForCalendar: [],
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
    },
    setContributionDataForCalendar: (state, action: PayloadAction<object>) => {
      state.contributionDataForCalendar = action.payload
    }
  }
})

export const {
  setCurrentActivity,
  setPickedDate,
  setTodayDate,
  setLogContentEditable,
  setContributionData,
  setContributionDataForCalendar
} = contributionCalendarSlice.actions

export const selectCurrentActivity = (state: RootState) =>
  state.contributionCalendar.currentActivity

export const selectPickedDate = (state: RootState) => state.contributionCalendar.pickedDate
export const selectLogContentEditable = (state: RootState) =>
  state.contributionCalendar.logContentEditable

export const selectLogContentForDate = (state: RootState, date: string) => {
  let activityName = state.contributionCalendar.currentActivity
  if (activityName) {
    let data = state.contributionCalendar.contributionData[activityName]
    console.log('selectLogContentForDate', data, date)
    return data[date]?.Content
  }
  return undefined
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

export const selectContributionDataForCalendar = (state: RootState, activityName: string) => {
  return state.contributionCalendar.contributionDataForCalendar[activityName]
}
export default contributionCalendarSlice.reducer
