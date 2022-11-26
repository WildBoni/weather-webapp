import {useState, createRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MobileMenuBar from './MobileMenuBar';
import {setTextFilter} from '../../features/filtersSlice';
import FilterSelectedCities from '../ui/FilterSelectedCities';
import {addToast} from '../../features/toastsSlice';
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
        dispatch(weatherApi.endpoints.getWeatherByCoords.initiate(position.coords))
          .then(
            () => dispatch(addToast({text: 'Your location has been added!'})), 
            () => dispatch(addToast({text: 'City not found.'}))
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