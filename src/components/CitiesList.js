import React from 'react';
import {connect, useDispatch} from 'react-redux';
import styled from 'styled-components';
// import moment from 'moment';
import {weatherIconUrl} from '../shared/baseUrls';
import CitiesListItem from './CitiesListItem';
import {selectCityByName} from '../selectors/cities'
import {selectCity} from '../features/citiesSlice';
// import {startRemoveWeatherLocation} from '../actions/weather';
// import {loadForecast} from '../actions/forecast';
import {addToast} from '../features/toastsSlice';
import {apiUrl} from '../shared/baseUrls';
import { getTime } from 'date-fns';
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

function CitiesList(props) {
	const dispatch = useDispatch();
	
	let onSelectCity = (id) => {
		dispatch(selectCity(id));
		let filteredCity = props.cities.filter((city) => city[0] === id.toString());
		let filteredCityCoords = filteredCity[0][1].coord;
		dispatch(weatherApi.endpoints.getWeatherByCity.initiate(filteredCityCoords)).then(
			(res) => dispatch(addToast({text: `${filteredCity[0][1].name} forecast loaded.`})), 
			(err) => dispatch(addToast({text: `${err}.`}))
		)
	}

	let onRemoveCity = (id) => {
		let filtered = props.cities.filter((city) => city[0] !== id.toString());
		if(filtered.length > 0) {
			// dispatch(startRemoveWeatherLocation(id))
			// 	.then(dispatch(addToast({text: 'City removed!'})));
				dispatch(addToast({text: 'City removed!'}));
				dispatch(selectCity(filtered[0][1].id));
		}
	}

	return(
		<Container>
		{
			props.cities.map(([key, val]) => {
				let details = {
					id: val.id,
					lat: val.coord.lat,
					lon: val.coord.lon,
					name: val.name, 
					weather: val.weather[0].main, 
					icon: val.weather[0].icon,
					iconUrl: `${weatherIconUrl}${val.weather[0].icon}`, 
					temperature: Math.round(val.main.temp), 
					time: Math.floor(getTime(new Date(val.dt)) / 1000).format('dddd D, MMMM'),
					hour: Math.floor(getTime(new Date(val.dt)) / 1000).format('kk:mm a')
				};
				return	(
					<CitiesListItem key={details.id} 
						onRemoveCity={onRemoveCity} 
						onSelectCity={onSelectCity} 
						details={details}
					/>)
			})
		}
		</Container>
	)
}

const mapStateToProps = (state) => {
	console.log(state)
	return {
		cities: selectCityByName(state.weather.locations, state.filters.text)
	}
}

export default connect(mapStateToProps)(CitiesList);