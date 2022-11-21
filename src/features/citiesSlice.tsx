import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import {defaultCities} from './../store/defaultCities';

const initialState = defaultCities;

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    selectCity: (state, action: PayloadAction<number>) => {
      state.selectedCity = action.payload;
    }
  }
})

const {actions, reducer} = citiesSlice;
export const {selectCity} = actions;
export default reducer

