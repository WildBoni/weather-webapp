import React from 'react';
import styled from 'styled-components';
import SelectedCityWeekForecastCard from './SelectedCityWeekForecastCard';
import ScrollContainer from 'react-indiana-drag-scroll';

const CardContainer = styled.div`
  cursor: pointer;
  display: flex;
  margin: 20px 0 0 20px;
  @media(min-width:996px) {
    margin: 0;
  }
`

function SelectedCityWeekForecastContainer(props) {
  return(
    <ScrollContainer>
      <CardContainer>
        {
          props.dailyForecast.map((forecast) => 
              <SelectedCityWeekForecastCard key={forecast.dt} dailyForecast={forecast}/>
          )
        }
      </CardContainer>
    </ScrollContainer>
  )
}

export default SelectedCityWeekForecastContainer;