import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import timeUtils from '../../../../utils/time-utils'

export interface Route {
  route: string
}

const initialState: Route = {
  route: ''
}

export const routeSlice = createSlice({
  name: 'contributionCalendar',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setRoute: (state, action: PayloadAction<string>) => {
      state.route = action.payload
    }
  }
})

export const { setRoute } = routeSlice.actions

export const selectRoute = (state: RootState) => state.router.route
export default routeSlice.reducer
