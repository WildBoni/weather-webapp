import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CityWeather} from '../shared/weather.interfaces';


const initialState: CityWeather[] = [];

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCityWeather: (state, action: PayloadAction<CityWeather>) => {
      state.push(action.payload);
    },
    removeCityWeather: (state, action: PayloadAction<number>) => {
      state.filter((city) => city.id !== action.payload)
    }
  }
})

const {actions, reducer} = weatherSlice;
export const {setCityWeather} = actions;
export default reducer;