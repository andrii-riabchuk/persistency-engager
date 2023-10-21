import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import timeUtils from '../../../../utils/time-utils'

export interface ContributionCalendarState {
  pickedDate: string
  contributionData: object
  logContentEditable: string
}

const initialState: ContributionCalendarState = {
  pickedDate: '',
  contributionData: {},
  logContentEditable: ''
}

export const contributionCalendarSlice = createSlice({
  name: 'contributionCalendar',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
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

export const { setPickedDate, setTodayDate, setLogContentEditable, setContributionData } =
  contributionCalendarSlice.actions

export const selectPickedDate = (state: RootState) => state.contributionCalendar.pickedDate
export const selectLogContentEditable = (state: RootState) =>
  state.contributionCalendar.logContentEditable

export const selectLogContentForDate = (state: RootState, date: string) => {
  let data = state.contributionCalendar.contributionData
  return data[date]?.Content
}

export const selectContributionData = (state: RootState) =>
  state.contributionCalendar.contributionData

export default contributionCalendarSlice.reducer
