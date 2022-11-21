// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {apiUrl} from '../shared/baseUrls';

declare const weatherAPI : {
  loadWeatherByCity<Response>(city: string): { data: Response }
}

// interface initialState {
//   locations: object;
//   isLoading: boolean;
//   error: null | string | undefined;
// }

// const initialState: initialState = {
//  locations: {},
//  isLoading: false,
//  error: null
// }

interface Location {}
interface Forecast {}

interface Coords {
  lat: string,
  lon: string
}

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}` }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<Location, string>({
      query: (city) => `weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API}&units=metric`,
    }),
    getWeatherByCoordinates: builder.query<Location, Coords>({
      query: (coords) => `weather?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.REACT_APP_OPENWEATHER_API}&units=metric`,
    }),
    getForecastByCoordinates: builder.query<Forecast, Coords>({
      query: (coords) => `onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.REACT_APP_OPENWEATHER_API}&units=metric&exclude=minutely,alerts`,
    }),
  }),
})

export const { useGetWeatherByCityQuery, useGetWeatherByCoordinatesQuery, useGetForecastByCoordinatesQuery } = weatherApi;
