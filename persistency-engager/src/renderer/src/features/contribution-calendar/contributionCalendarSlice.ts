import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import timeUtils from '../../../../utils/time-utils'

export interface ContributionCalendarState {
  currentActivity: string
  pickedDate: string
  contributionData: object
  contributionDataForCalendar: object
  logContentEditable: string
  focusEditorState: boolean
}

const initialState: ContributionCalendarState = {
  currentActivity: '',
  pickedDate: '',
  contributionData: {},
  contributionDataForCalendar: [],
  logContentEditable: '',
  focusEditorState: false
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
      const [_, TODAY] = timeUtils.lastYearRangeFormatted()
      state.pickedDate = TODAY
      state.focusEditorState = true
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
    },
    setFocusEditorState: (state, action: PayloadAction<boolean>) => {
      state.focusEditorState = action.payload
    }
  }
})

export const {
  setCurrentActivity,
  setPickedDate,
  setTodayDate,
  setLogContentEditable,
  setContributionData,
  setContributionDataForCalendar,
  setFocusEditorState
} = contributionCalendarSlice.actions

export const selectCurrentActivity = (state: RootState) =>
  state.contributionCalendar.currentActivity

export const selectPickedDate = (state: RootState) => state.contributionCalendar.pickedDate
export const selectLogContentEditable = (state: RootState) =>
  state.contributionCalendar.logContentEditable

export const selectLogContentForDate = (state: RootState, date: string) => {
  const activityName = state.contributionCalendar.currentActivity
  if (activityName) {
    const data = state.contributionCalendar.contributionData[activityName]
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
  const data = state.contributionCalendar.contributionData
  if (data && data[activityName]) return data[activityName]
  return []
}

export const selectContributionDataForCalendar = (state: RootState, activityName: string) => {
  return state.contributionCalendar.contributionDataForCalendar[activityName]
}

export const selectFocusEditorState = (state: RootState) =>
  state.contributionCalendar.focusEditorState
export default contributionCalendarSlice.reducer
