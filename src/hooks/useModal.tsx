// modal window for adding a new city
import {useState} from 'react';
import {useAppDispatch} from '../hooks/useRedux';
import {weatherApi} from '../services/weatherApi';
import {addToast} from '../features/toastsSlice';
import {setCityWeather} from '../features/weatherSlice';

let Modal = () => {
  let dispatch = useAppDispatch();

  let [modal, setModal] = useState(false);
  let [modalContent, setModalContent] = useState('content');
  let [inputContent, setInputContent] = useState('');

  let addCity = () => {
    dispatch(weatherApi.endpoints.getWeatherByCity.initiate(inputContent))
      .then(
        (res) => {
          res.data && dispatch(setCityWeather(res.data));
          res.data && dispatch(addToast({text: `${res.originalArgs} weather added.`}))
        }
      ).catch(
        (err) => dispatch(addToast({text: `${err.error}.`}))
      )
    handleModal();
  }

  let handleModal = (content='') => {
    setModal(!modal);
    if(content) {
      setModalContent(content);
    }
  }

  let handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addCity();
    }
  };
  
  let handleChange = (e: Event) => {
    let target = e.target as HTMLInputElement;
    setInputContent(target.value);
  }
  
  return {modal, handleModal, modalContent, addCity, handleChange, handleKeyPress};
}

export default Modal;