import React, {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import{ThemeContext} from 'styled-components';
import SelectedCity from './SelectedCity';
import {apiUrl} from '../shared/baseUrls';
// import {loadForecast} from '../actions/forecast';
// import {addToast} from '../actions/toasts';
import {connect} from 'react-redux';
import {selectCityById} from '../selectors/cities';
import {weatherIconUrl} from '../shared/baseUrls';
// import moment from 'moment';
import { getTime } from 'date-fns';

const Container = styled.div`
  background: ${props => props.styles.blueGradient};
  min-height: 100vh;
  padding-bottom: 30px;
`

function MobileSelectedCityContainer(props) {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const forecast = useSelector(state => state.forecast.details);

  let details = props.location.state.details;
  // const weather = useSelector(state => state.weather.locations[props.match.params.id]);

  // let fetchSelectedCityForecast = (lat, lon) => dispatch(
  //   loadForecast(`${apiUrl}onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_API}&units=metric&exclude=minutely,alerts`)
  // ).then(
  //   (res) => dispatch(addToast({text: `${details.name} forecast loaded.`})), 
  //   (err) => dispatch(addToast({text: `${err}.`}))
  // )

  return(
    <Container styles={themeContext}>
      { 
				props.city &&
          <SelectedCity 
            dailyForecast={forecast.result.daily}
            hourlyForecast={forecast.result.hourly}
            details={props.city}
          />
      }
    </Container>
  )
}

const mapStateToProps = (state) => {
	const city = selectCityById(state.weather.locations, state.cities.selectedCity);
	let cityDetails;
	if(city) {
		 cityDetails = {
			id: city[1].id,
			lat: city[1].coord.lat,
			lon: city[1].coord.lon,
			name: city[1].name, 
			weather: city[1].weather[0].main, 
			wind: city[1].wind.speed, 
			humidity: city[1].main.temp, 
			icon: city[1].weather[0].icon,
			iconUrl: `${weatherIconUrl}${city[1].weather[0].icon}`, 
			temperature: Math.round(city[1].main.temp), 
			maxTemperature: Math.round(city[1].main.temp_max), 
			minTemperature: Math.round(city[1].main.temp_min), 
			time: Math.floor(getTime(new Date(city[1].dt)) / 1000).format('dddd D, MMMM'),
			hour: Math.floor(getTime(new Date(city[1].dt)) / 1000).format('kk:mm a')
		}
	};

	return {
		city: cityDetails
	}
}

export default connect(mapStateToProps)(MobileSelectedCityContainer);