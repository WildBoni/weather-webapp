import {useDispatch, useSelector} from 'react-redux';
import SearchBar from '../ui/SearchBar';
import AddLocalization from '../ui/AddLocalization';
import {setTextFilter} from '../../features/filtersSlice';
import {addToast} from '../../features/toastsSlice';
import {setCityWeather} from '../../features/weatherSlice';
import CitiesList from '../CitiesList';
import AddCity from '../ui/AddCity';

import {weatherApi} from '../../services/weatherApi';

function DesktopFavCitiesColumn() {
	let dispatch = useDispatch();
	let filters = useSelector(state => state.filters);
	
	let onTextChange = (e) => {
		dispatch(setTextFilter(e.target.value));
	}
	
	let clearFilter = () => {
		dispatch(setTextFilter(""));
	}

	function getGeolocation(e) {
		e.preventDefault();
		if('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				dispatch(weatherApi.endpoints.getWeatherByCoordinates.initiate({lon: position.coords.latitude, lat: position.coords.longitude}))
					.then(
						(res) => {
							res.data && dispatch(setCityWeather(res.data));
							dispatch(addToast({text: `Your location has been added!`}))
						}, 
						(err) => dispatch(addToast({text: `${err}.`}))
					)
			});
			//TODO: create a snackbar to show related messages
		} else {
			//TODO: handle devices without geolocation navigator
		}
	}

	return(
		<>
			<AddLocalization geolocation={getGeolocation}/>
			<AddCity/>
			<CitiesList/>
			<SearchBar value={filters.text} onChange={onTextChange} clearFilter={clearFilter} />
		</>
	)
}

export default DesktopFavCitiesColumn;