import React from 'react';
import styled from 'styled-components';
import{useContext} from 'react';
import{ThemeContext} from 'styled-components';
// import moment from 'moment';
import { format } from 'date-fns';
import {weatherIconUrl} from '../shared/baseUrls';
import {weatherBackgroundColor} from '../shared/weatherBackgroundColor';

const Card = styled.div`
  background: ${props => props.styles[props.cardColor]};
  border-radius: 5px;
  box-shadow: ${props => props.styles.boxShadow};
  color: white;
  grow: 1;
  margin: 20px 8px;
  padding: 20px 25px;
  text-align: center;
`
const Day = styled.div`
  font-size: 22px;
  font-weight: 600;
`
const Temperature = styled.div`
  font-size: 36px;
  font-weight: 600;
`

function SelectedCityWeekForecastCard(props) {
  const themeContext = useContext(ThemeContext);
  
  let dailyForecast = props.dailyForecast;
  let day = dailyForecast.dt.format('dddd');
  let temperature = Math.round(dailyForecast.temp.day);
  let iconUrl = `${weatherIconUrl}${dailyForecast.weather[0].icon}`;
	let cardColor = weatherBackgroundColor(dailyForecast.weather[0].icon);
	
  return(
    <Card styles={themeContext} cardColor={cardColor}>
      <Day>{day}</Day>
      <Temperature>{temperature}°</Temperature>
      <img src={`${iconUrl}@2x.png`} alt={dailyForecast.weather[0].description} />
    </Card>
  )
}

export default SelectedCityWeekForecastCard;