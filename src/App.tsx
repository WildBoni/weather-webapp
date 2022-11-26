import {useEffect} from 'react';
import './App.css';

import {ThemeProvider} from 'styled-components';
import {ModalProvider} from "./context/modalContext";
import AppRouter from './routers/AppRouter';
import GlobalStyles from './styles/GlobalStyles.js';
import theme from './styles/theme';
import Toasts from "./components/Toasts";

import {defaultCities} from './store/defaultCities';
import {setCityWeather} from './features/weatherSlice';
import {addToast} from './features/toastsSlice';
import { useAppDispatch } from './hooks/useRedux';

import {weatherApi} from './services/weatherApi';

function App() {
  useEffect(() => {
    fetchDefaultCitiesWeather();
  }, [])
  
  let dispatch = useAppDispatch();
  
  let fetchDefaultCitiesWeather = () => Object
    .entries(defaultCities.cities)
    .forEach(([key,val]) => {
      dispatch(weatherApi.endpoints.getWeatherByCity.initiate(val.name))
      .then(
        (res) => {
          res.data && dispatch(setCityWeather(res.data));
          dispatch(addToast({text: `${res.originalArgs} weather loaded.`}))
        }
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
