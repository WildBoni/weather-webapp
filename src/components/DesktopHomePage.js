import React, {useEffect, useState, useContext, useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {loadForecast} from '../actions/forecast';
import {apiUrl} from '../shared/baseUrls';
import SelectedCityDetails from './SelectedCityDetails';
import {addToast} from '../features/toastsSlice';
import {connect} from 'react-redux';
import styled, {ThemeContext} from 'styled-components';
import DesktopFavCitiesColumn from './DesktopFavCitiesColumn';
// import moment from 'moment';
import {weatherIconUrl} from '../shared/baseUrls';
import {selectCityById} from '../selectors/cities'
import SelectedCityTodayForecastContainer from './SelectedCityTodayForecastContainer';
import SelectedCityWeekForecastContainer from './SelectedCityWeekForecastContainer';
import { getTime } from 'date-fns';
import {weatherApi} from '../services/weatherApi';

const Container = styled.section`
	display: grid;
	grid-template-columns: 1fr 4fr 2fr;
	grid-template-rows: minmax(auto, 500px) minmax(420px, auto);
	grid-gap: 20px;
	padding: 20px;
	height: calc(100vh - 40px);
`
const Section = styled.section`
	grid-column: 3/4;
	grid-row: 1/3;
	align-self: stretch;
	justify-self: stretch;
	display: flex;
	flex-direction: column;
	// height: calc(100vh - 60px);
	position: relative;
	padding: 10px;
	background-color: #262346;
	overflow: hidden
`

const StyledContainer = styled.div`
	grid-row: 2/3;
	grid-column: 1/2;
	justify-self: stretch;
	align-self: stretch;
	overflow: hidden;
  background: ${props => props.styles.purpleGradient};
  padding: 20px;
	display: flex;
	flex-direction: column;
	position: relative;
  // margin: 25px 0 0 0;
  // width: 25%;
`
const Title = styled.h2`
  color: white;
	font-size: 28px;
  padding: 18px 20px 16px 20px;
`
const ForecastContainer = styled.div`
  // background: ${props => props.styles.blueGradient};
  box-shadow: 5px 5px 11px 2px rgb(0 0 0 / 40%);
	overflow: hidden;
  // border-radius: 25px;
  // height: 314px;
`

const StyledTabs = styled.div`
	grid-row: 2/3;
	grid-column: 2/3;
	align-self: baseline;
  background-color: ${props => props.styles.purple};
  padding: 20px;
	overflow: hidden;
  // border-radius: 25px;
  // margin: 25px 0 0 0;
  // width: 75%;
`

function DesktopHomePage(props) {
	const dispatch = useDispatch();
	const themeContext = useContext(ThemeContext);
  const forecast = useSelector(state => state.forecast.details);
	let [isCityReady, setIsCityReady] = useState(false);

	useEffect(() => {
		if(props.city && !isCityReady) {
			setIsCityReady(true);
			fetchSelectedCityForecast(props.city.lat,props.city.lon)
		}
  }, [props])
  
  let fetchSelectedCityForecast = (lat, lon) =>	dispatch(
			weatherApi.endpoints.getForecastByCoordinates.initiate({lat, lon})
		)
  	.then(
			(res) => dispatch(addToast({text: `${props.city.name} forecast loaded.`})), 
			(err) => dispatch(addToast({text: `${err}.`}))
  )
	
  return(
    <Container>
			{ 
				props.city &&
				<SelectedCityDetails data={props.city} current={forecast.result.current}/>
			}
			{forecast.result.hourly.length >= 1 &&
				<StyledContainer styles={themeContext}>
					<Title styles={themeContext}>Temps</Title>
					<ForecastContainer styles={themeContext}>
						<SelectedCityTodayForecastContainer hourlyForecast={forecast.result.hourly}/>
					</ForecastContainer>
				</StyledContainer>
			}

			{forecast?.result?.daily?.length >= 1 &&
				<StyledTabs styles={themeContext}>
					<Title styles={themeContext}>Daily forecast</Title>
					<SelectedCityWeekForecastContainer dailyForecast={forecast.result.daily}/>
					{/* <SelectedCityTabs current={forecast.current} data={props.data}/> */}
				</StyledTabs>
			}


			
      <Section>
        <DesktopFavCitiesColumn/>
      </Section>
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

export default connect(mapStateToProps)(DesktopHomePage);