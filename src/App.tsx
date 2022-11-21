import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import logo from './logo.svg';
import './App.css';

import {ThemeProvider} from 'styled-components';
import {ModalProvider} from "./context/modalContext";
import AppRouter from './routers/AppRouter';
import GlobalStyles from './styles/GlobalStyles.js';
import theme from './styles/theme';
import Toasts from "./components/Toasts";

import {defaultCities} from './store/defaultCities';
import { AppThunk } from './store/configureStore';
// import {loadWeather} from './actions/weather';
import {addToast} from './features/toastsSlice';
import {apiUrl} from './shared/baseUrls';
import { useAppDispatch } from './hooks/useRedux';

import {useGetWeatherByCityQuery, weatherApi} from './services/weatherApi';

function App() {
  // const {data,error,isLoading} = useGetWeatherByCityQuery('dubai');

  // console.log(data,error,isLoading)
  
  useEffect(() => {
    fetchDefaultCitiesWeather();
  }, [])
  
  let dispatch = useAppDispatch();
  
  let fetchDefaultCitiesWeather = () => Object
    .entries(defaultCities.cities)
    .forEach(([key,val]) => {
      dispatch(weatherApi.endpoints.getWeatherByCity.initiate(val.name))
      .then(
        (res) => dispatch(addToast({text: `${res.data} weather loaded.`}))
      ).catch(
        (err) => dispatch(addToast({text: `${err.error}.`}))
      )
    });
  
  return (
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <GlobalStyles/>
        <AppRouter/>
        <Toasts/>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
