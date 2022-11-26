import {useContext} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import SelectedCityDetails from '../selected-city/SelectedCityDetails';
import SelectedCityTodayForecastContainer from '../selected-city/SelectedCityTodayForecastContainer';
import SelectedCityWeekForecastContainer from '../selected-city/SelectedCityWeekForecastContainer';
import {ModalContext} from "../../context/modalContext";
import {StyledIconBase} from '@styled-icons/styled-icon';
import { ArrowLeft, PlusSquare } from '@styled-icons/bootstrap';

const BackButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  left: 20px;
  top: 25px;
  cursor:pointer;
  &:focus {
    outline: 0;
  }
`
const AddButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  cursor:pointer;
  right: 20px;
  top: 25px;
  &:focus {
    outline: 0;
  }
`

export const IconStyleWrapper = styled.div`
  ${StyledIconBase} {
    color: white;
    height: 30px;
  }
`

function MobileSelectedCity(props) {
  let {handleModal} = useContext(ModalContext);

  return(
    <>
      <Link to="/">
        <BackButton>
          <IconStyleWrapper>
            <ArrowLeft />
          </IconStyleWrapper>
        </BackButton>
      </Link>
      <AddButton onClick={() => handleModal('Type a city')}>
        <IconStyleWrapper>
          <PlusSquare />
        </IconStyleWrapper>
      </AddButton>
      <SelectedCityDetails details={props.details} current={props.current}/>
      <SelectedCityTodayForecastContainer hourlyForecast={props.hourlyForecast}/>
      <SelectedCityWeekForecastContainer dailyForecast={props.dailyForecast}/>
    </>
  )
}

export default MobileSelectedCity;