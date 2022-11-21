// import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
// import thunk from 'redux-thunk';
// import citiesReducer from '../reducers/cities';
import citiesReducer from '../features/citiesSlice';
import {weatherApi} from '../services/weatherApi';
// import {forecastApi} from '../services/forecastApi';
import filtersReducer from '../features/filtersSlice';
import toastsReducer from '../features/toastsSlice';


import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    // forecast: forecastReducer,
    filters: filtersReducer,
    toasts: toastsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;