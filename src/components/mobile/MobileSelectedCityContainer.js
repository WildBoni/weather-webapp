import {useState, useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import{ThemeContext} from 'styled-components';
import MobileSelectedCity from './MobileSelectedCity';
import {format} from 'date-fns';
import {weatherIconUrl} from '../../shared/baseUrls';
import {selectCityById} from '../../selectors/cities'
import {setCityForecast} from '../../features/forecastSlice';
import {addToast} from '../../features/toastsSlice';
import {weatherApi} from '../../services/weatherApi';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  background: ${props => props.styles.blueGradient};
  min-height: 100vh;
  padding-bottom: 30px;
`

function MobileSelectedCityContainer() {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const weatherLocations = useSelector(state => state.weather);
  const cityForecast = useSelector(state => state.forecast);

  let [isForecastReady, setIsForecastReady] = useState(false);
	let [cityDetails, setCityDetails] = useState('');
  
  let location = useLocation();
  let currentCityId = location.pathname.split('/')[2];
  let city = selectCityById(weatherLocations, +currentCityId);
  
	useEffect(() => {
		if(city) {
      setCityDetails({
				id: city.id,
				lat: city.coord.lat,
				lon: city.coord.lon,
				name: city.name, 
				weather: city.weather[0].main, 
				wind: city.wind.speed, 
				humidity: city.main.temp, 
				icon: city.weather[0].icon,
				iconUrl: `${weatherIconUrl}${city.weather[0].icon}`, 
				temperature: Math.round(city.main.temp), 
				maxTemperature: Math.round(city.main.temp_max), 
				minTemperature: Math.round(city.main.temp_min), 
				time: format(new Date(city.dt * 1000), 'EEEE d, MMMM'),
				hour: format(new Date(city.dt * 1000), 'kk:mm a')
			});
			fetchSelectedCityForecast(city.coord.lat,city.coord.lon)
		}
  }, [city])
  
  useEffect(() => {
    if(cityForecast?.details?.current) {
			setIsForecastReady(true);
		}
  }, [cityForecast])
  
  let fetchSelectedCityForecast = (lat, lon) =>	dispatch(
		weatherApi.endpoints.getForecastByCoordinates.initiate({lat, lon})
	)
  	.then(
			(res) => {
				res.data && dispatch(setCityForecast(res.data));
				dispatch(addToast({text: `${city.name} forecast loaded.`}))
			}, 
			(err) => dispatch(addToast({text: `${err}.`}))
  	)

  return(
    <Container styles={themeContext}>
      { 
				city && cityDetails && isForecastReady && cityForecast?.details?.hourly?.length >= 1 &&
          <MobileSelectedCity 
            current={cityForecast.details.current}
            dailyForecast={cityForecast.details.daily}
            hourlyForecast={cityForecast.details.hourly}
            details={cityDetails}
          />
      }
    </Container>
  )
}

export default MobileSelectedCityContainer;