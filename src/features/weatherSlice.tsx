import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CityWeather, CityForecast, Coords} from '../shared/weather.interfaces';


const initialState: CityWeather[] = [];

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCityWeather: (state, action: PayloadAction<CityWeather>) => {
      state.push(action.payload);
    }
  }
})

const {actions, reducer} = weatherSlice;
export const {setCityWeather} = actions;
export default reducer;