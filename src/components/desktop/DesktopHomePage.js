import {useEffect, useState, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SelectedCityDetails from '../selected-city/SelectedCityDetails';
import {addToast} from '../../features/toastsSlice';
import styled, {ThemeContext} from 'styled-components';
import DesktopFavCitiesColumn from './DesktopFavCitiesColumn';
import {weatherIconUrl} from '../../shared/baseUrls';
import {selectCityById} from '../../selectors/cities';
import SelectedCityTodayForecastContainer from '../selected-city/SelectedCityTodayForecastContainer';
import SelectedCityWeekForecastContainer from '../selected-city/SelectedCityWeekForecastContainer';
import {weatherApi} from '../../services/weatherApi';
import {setCityForecast} from '../../features/forecastSlice';
import {format} from 'date-fns';

const Container = styled.section`
	display: grid;
	grid-template-columns: 1fr 4fr 2fr;
	grid-template-rows: minmax(auto, 500px) minmax(420px, auto);
	grid-gap: 20px;
	padding: 20px;
	height: calc(100vh - 40px);
	// background-color: #1c193a;
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
  // background: ${props => props.styles.purpleGradient};
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
  // padding: 18px 20px 16px 20px;
`
const ForecastContainer = styled.div`
	background-color: #272346;
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
  // background-color: ${props => props.styles.purple};
  padding: 20px;
	overflow: hidden;
  // border-radius: 25px;
  // margin: 25px 0 0 0;
  // width: 75%;
`

function DesktopHomePage() {
	const dispatch = useDispatch();
	const themeContext = useContext(ThemeContext);

  const selectedCityId = useSelector(state => state.cities.selectedCity);
  const weatherLocations = useSelector(state => state.weather);
  const cityForecast = useSelector(state => state.forecast);
	
	let [isForecastReady, setIsForecastReady] = useState(false);
	let [cityDetails, setCityDetails] = useState('');
	
	let city = selectCityById(weatherLocations, selectedCityId)
	
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
    <Container>
			{ 
				city && cityDetails && isForecastReady &&
				<SelectedCityDetails details={cityDetails} current={cityForecast.details.current}/>
			}
			{city && cityDetails && isForecastReady && cityForecast?.details?.hourly?.length >= 1 &&
				<StyledContainer styles={themeContext}>
					<Title styles={themeContext}>Temps</Title>
					<ForecastContainer styles={themeContext}>
						<SelectedCityTodayForecastContainer hourlyForecast={cityForecast.details.hourly}/>
					</ForecastContainer>
				</StyledContainer>
			}

			{city && cityDetails && isForecastReady && cityForecast?.details?.daily?.length >= 1 &&
				<StyledTabs styles={themeContext}>
					<Title styles={themeContext}>Daily forecast</Title>
					<SelectedCityWeekForecastContainer dailyForecast={cityForecast.details.daily}/>
				</StyledTabs>
			}
			
      <Section>
        <DesktopFavCitiesColumn/>
      </Section>
    </Container>
  )
}

export default DesktopHomePage;