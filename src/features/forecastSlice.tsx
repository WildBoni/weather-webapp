import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { CityForecast } from '../shared/weather.interfaces';

const initialState: CityForecast = {
  details: {}
};

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setCityForecast: (state, action: PayloadAction<CityForecast>) => {
      state.details = action.payload;
    }
  }
})

const {actions, reducer} = forecastSlice;
export const {setCityForecast} = actions;
export default reducer;