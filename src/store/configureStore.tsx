import citiesReducer from '../features/citiesSlice';
import {weatherApi} from '../services/weatherApi';
import weatherReducer from '../features/weatherSlice';
import forecastReducer from '../features/forecastSlice';
import filtersReducer from '../features/filtersSlice';
import toastsReducer from '../features/toastsSlice';


import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    weather: weatherReducer,
    forecast: forecastReducer,
    filters: filtersReducer,
    toasts: toastsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;