import styled from 'styled-components';

let Container = styled.section`
  // display: flex;
  color: white;
  border-radius: 5px;
  background-color: rgba(255,255,255,0.1);
  box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17);
  padding: 30px 30px 18px 30px;
  margin: 20px 0;
`

let SelectedCityTodayDetails = (props) => {
  let todayForecast = props.current;
  let todayDetails = props.data;
  let windSpeed = todayDetails.wind;
  let highTemp = todayDetails.maxTemperature; 
  let lowTemp = todayDetails.minTemperature; 
  let humidity = todayDetails.humidity;
  let uv = todayForecast.uvi; 
  let dewPoint = Math.round(todayForecast.dew_point);
  return(
    <Container>
        <p>Wind: {windSpeed} m/s</p>
        <p>The high temperature will be <strong>{highTemp}°C</strong>, the low will be <strong>{lowTemp}°C</strong></p>
        <p>Humidity: {humidity}%<br/>
          UV: {uv}<br/>
          Dew point: {dewPoint}°C
        </p>
    </Container>
  )
}

export default SelectedCityTodayDetails;