import React from 'react';
import styled from 'styled-components';
// import moment from 'moment';
import { format } from 'date-fns';

let Container = styled.section`
  // display: flex;
  color: white;
  border-radius: 5px;
  background-color: rgba(255,255,255,0.1);
  box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17);
  padding: 30px 30px 18px 30px;
  margin: 20px 0;
`
let LeftContent = styled.article`
  width: 40%;
  h3 {
    font-size: 22px;
  }
`
let RightContent = styled.article`
  width: 60%;
  h2 {
    font-size: 36px;
  }
  p {
    font-size: 18px;
    margin: 20px 0;
    font-weight: 300;
  }
`

let SelectedCityTodayDetails = (props) => {
  let todayForecast = props.current;
  let todayDetails = props.data;
  let day = format(new Date(todayForecast.dt * 1000), 'ddd, dd MMM');
  let temperature = Math.round(todayForecast.temp);
  let windSpeed = todayDetails.wind;
  let highTemp = todayDetails.maxTemperature; 
  let lowTemp = todayDetails.minTemperature; 
  let humidity = todayDetails.humidity;
  let uv = todayForecast.uvi; 
  let dewPoint = Math.round(todayForecast.dew_point);
  return(
    <Container>
      {/* <LeftContent>
        <h3>{day}</h3>
        <img src="../images/wind.png" alt="wind icon"/>
      </LeftContent> */}
      {/* <RightContent> */}
        {/* <h2>{temperature}°</h2> */}
        <p>Wind: {windSpeed} m/s</p>
        <p>The high temperature will be <strong>{highTemp}°C</strong>, the low will be <strong>{lowTemp}°C</strong></p>
        <p>Humidity: {humidity}%<br/>
          UV: {uv}<br/>
          Dew point: {dewPoint}°C
        </p>
      {/* </RightContent> */}
    </Container>
  )
}

export default SelectedCityTodayDetails;