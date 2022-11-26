import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {apiUrl} from '../shared/baseUrls';
import {CityWeather, CityForecast, Coords} from '../shared/weather.interfaces';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}` }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<CityWeather, string>({
      query: (city) => `weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API}&units=metric`,
    }),
    getWeatherByCoordinates: builder.query<CityWeather, Coords>({
      query: (coords) => `weather?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.REACT_APP_OPENWEATHER_API}&units=metric`,
    }),
    getForecastByCoordinates: builder.query<CityForecast, Coords>({
      query: (coords) => `onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.REACT_APP_OPENWEATHER_API}&units=metric&exclude=minutely,alerts`,
    }),
  }),
})

export const { useGetWeatherByCityQuery, useGetWeatherByCoordinatesQuery, useGetForecastByCoordinatesQuery } = weatherApi;
