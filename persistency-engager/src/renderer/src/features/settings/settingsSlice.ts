import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'

export interface SettingsState {
  activityName: string
}

const initialState: SettingsState = {
  activityName: 'default'
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setActivityName: (state, action: PayloadAction<string>) => {
      state.activityName = action.payload
    }
  }
})

export const { setActivityName } = counterSlice.actions

export const selectActivityName = (state: RootState) => state.counter.activityName

export default counterSlice.reducer
