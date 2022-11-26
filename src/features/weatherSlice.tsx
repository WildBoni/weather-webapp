import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CityWeather} from '../shared/weather.interfaces';
import { current } from '@reduxjs/toolkit';

const initialState: CityWeather[] = [];

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCityWeather: (state, action: PayloadAction<CityWeather>) => {
      state.unshift(action.payload);
    },
    removeCityWeather: (state, action: PayloadAction<number>) => {
      return state.filter((city) => city.id !== action.payload)
    }
  }
})

const {actions, reducer} = weatherSlice;
export const {setCityWeather, removeCityWeather} = actions;
export default reducer;