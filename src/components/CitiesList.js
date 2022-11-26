import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {weatherIconUrl} from '../shared/baseUrls';
import CitiesListItem from './CitiesListItem';
import {selectCityByName} from '../selectors/cities'
import {selectCity} from '../features/citiesSlice';
import {removeCityWeather} from '../features/weatherSlice';
import {addToast} from '../features/toastsSlice';
import { format } from 'date-fns';
import {weatherApi} from '../services/weatherApi';

let Container = styled.div`
	@media(min-width:996px) {
		margin-top: 10px;
    max-height: calc(100% - 220px);
    overflow: auto;  
    // padding-right: 10px;

		&::-webkit-scrollbar {
			width: 10px;
		}
		&::-webkit-scrollbar-track {
			background: #f1f1f1; 
		}
		&::-webkit-scrollbar-thumb {
			background: #888; 
		}
		&::-webkit-scrollbar-thumb:hover {
			background: #555; 
		}
	}
`

function CitiesList() {
	const dispatch = useDispatch();
	let filters = useSelector(state => state.filters);
	let weatherLocations = useSelector(state => state.weather);
	let filteredWeatherLocations = selectCityByName(weatherLocations, filters.text);

	let onSelectCity = (id) => {
		dispatch(selectCity(id));
		let filteredCity = filteredWeatherLocations.find((city) => city.id === id);
		let filteredCityCoords = filteredCity.coord;
		dispatch(weatherApi.endpoints.getForecastByCoordinates.initiate(filteredCityCoords)).then(
			(res) => dispatch(addToast({text: `${filteredCity.name} forecast loaded.`})), 
			(err) => dispatch(addToast({text: `${err}.`}))
		)
	}

	let onRemoveCity = (id) => {
		let filtered = filteredWeatherLocations.filter((city) => city.id !== id);
		if(filtered.length > 0) {
			dispatch(removeCityWeather(id));
			dispatch(addToast({text: 'City removed!'}));
			dispatch(selectCity(filtered[0].id));
		}
	}

	return(
		<Container>
		{
			filteredWeatherLocations && filteredWeatherLocations.length > 0 && filteredWeatherLocations.map((location) => {
				let details = {
					id: location.id,
					lat: location.coord.lat,
					lon: location.coord.lon,
					name: location.name, 
					weather: location.weather[0].main, 
					icon: location.weather[0].icon,
					iconUrl: `${weatherIconUrl}${location.weather[0].icon}`, 
					temperature: Math.round(location.main.temp), 
					time: format(new Date(location.dt * 1000), 'EEEE d, MMMM'),
					hour: format(new Date(location.dt * 1000), 'kk:mm a')
				};
				return	(
					<CitiesListItem key={details.id} 
						onRemoveCity={onRemoveCity} 
						onSelectCity={onSelectCity} 
						details={details}
					/>
					)
			})
		}
		</Container>
	)
}

export default CitiesList;