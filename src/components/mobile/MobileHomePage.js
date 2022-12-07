import {useState, createRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MobileMenuBar from './MobileMenuBar';
import {setTextFilter} from '../../features/filtersSlice';
import FilterSelectedCities from '../ui/FilterSelectedCities';
import {addToast} from '../../features/toastsSlice';
import {setCityWeather} from '../../features/weatherSlice';
import CitiesList from '../CitiesList';
import AddCity from '../ui/AddCity';
import {weatherApi} from '../../services/weatherApi';

function MobileHomePage() {
  const [searchbar, setSearchbar] = useState(false);
  let dispatch = useDispatch()
  let textInput = createRef();
  let filters = useSelector(state => state.filters);

  let onTextChange = (e) => {
    dispatch(setTextFilter(e.target.value));
  }

  let clearFilter = () => {
    dispatch(setTextFilter(''))
  }

  let hideSearchbar = () => {
    setSearchbar(false);
  }

  let toggleSearchbar = () => {
    textInput.current.focus();
    setSearchbar(!searchbar);
  }
  
  function getGeolocation(e) {
    e.preventDefault();
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(weatherApi.endpoints.getWeatherByCoordinates.initiate({lat: position.coords.latitude, lon: position.coords.longitude}))
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
			<AddCity/>
			<CitiesList/>
      <FilterSelectedCities show={searchbar} clearFilter={clearFilter} handleClose={hideSearchbar}>
        <input type="text" placeholder="text: Rome" value={filters.text} onChange={onTextChange} ref={textInput}/>
      </FilterSelectedCities>
      <MobileMenuBar toggleSearchbar={toggleSearchbar} geolocation={getGeolocation}/>
    </>
  )
}

export default MobileHomePage;