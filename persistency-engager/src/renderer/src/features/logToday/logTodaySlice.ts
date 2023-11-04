import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface LogTodayState {
  shouldFocusEditor: boolean
}

const initialState: LogTodayState = {
  shouldFocusEditor: false
}

export const logTodaySlice = createSlice({
  name: 'logToday',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setShouldFocusEditor: (state, action: PayloadAction<boolean>) => {
      state.shouldFocusEditor = action.payload
    }
  }
})

export const { setShouldFocusEditor } = logTodaySlice.actions

export const shouldFocusEditor = (state: RootState) => state.logToday.shouldFocusEditor
export default logTodaySlice.reducer
