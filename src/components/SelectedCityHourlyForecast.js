import React from 'react';
import styled from 'styled-components';
// import moment from 'moment';
import { format } from 'date-fns';

const Forecast = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 15px solid white;
  border-radius: 50%;
  @media(min-width:996px) {
    border: 5px solid white;
  }
`
const Time = styled.div`
  position: absolute;
  top: -40px;
  font-size: 12px;
  font-weight: 300;
  @media(min-width:996px) {
    top: -8px;
    left: 15px;
  }
`
const Temperature = styled.div`
  position: absolute;
  top: 25px;
  font-size: 20px;
  font-weight: 300;
  @media(min-width:996px) {
    top: -15px;
    left: -45px;
  }
`
const Line = styled.div`
  flex-grow: 1;
  height: 4px;
  max-width:200px;
  min-width:100px;
  background-color: white;
  @media(min-width:996px) {
    min-width: 2px;
    height: 50px;
  }
`

function SelectedCityHourlyForecast(props) {
  let hourlyForecast = props.hourlyForecast;
  let hour = format(new Date(hourlyForecast.dt * 1000), 'kk:mm');
  let temperature = Math.round(hourlyForecast.temp);
  return(
    <>
      <Forecast>
        <Time>{hour}</Time>
        <Temperature>{temperature}°</Temperature>
      </Forecast>
      <Line></Line>
    </>
  )
}

export default SelectedCityHourlyForecast;