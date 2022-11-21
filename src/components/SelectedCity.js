import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import SelectedCityDetails from './SelectedCityDetails';
import SelectedCityTemperature from './SelectedCityTemperature';
import SelectedCityTodayForecastContainer from './SelectedCityTodayForecastContainer';
import SelectedCityWeekForecastContainer from './SelectedCityWeekForecastContainer';
import {ModalContext} from "../context/modalContext";
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

function SelectedCity(props) {
  let {handleModal} = React.useContext(ModalContext);
  const forecast = useSelector(state => state.forecast.details);

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
      <SelectedCityDetails data={props.details} current={forecast.result.current}/>
      {/* <SelectedCityTemperature data={props.details}/> */}
      <SelectedCityTodayForecastContainer hourlyForecast={props.hourlyForecast}/>
      <SelectedCityWeekForecastContainer dailyForecast={props.dailyForecast}/>
    </>
  )
}

export default SelectedCity;