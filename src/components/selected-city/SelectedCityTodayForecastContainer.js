import styled from 'styled-components';
import SelectedCityHourlyForecast from './SelectedCityHourlyForecast';
import ScrollContainer from 'react-indiana-drag-scroll';

const Container = styled(ScrollContainer)`
  @media(min-width:996px) {
    height:100%;
  }
`
const TodayForecast = styled.div`
  color: white;
  cursor: pointer;
  margin: 45px 10px;
  @media(min-width:996px) {
    margin: 30px 10px;
  }
`
const ForecastContainer = styled.div`
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: start;
  position: relative;
  @media(min-width:996px) {
    flex-direction: column;
    padding: 20px;
	}	
`

function SelectedCityTodayForecastContainer(props) {
  return(
    <Container>
      <TodayForecast>
        <ForecastContainer>
        {
          props.hourlyForecast.map((forecast) => 
              <SelectedCityHourlyForecast key={forecast.dt} hourlyForecast={forecast}/>
          )
        }
        </ForecastContainer>
      </TodayForecast>
    </Container>
  )
}

export default SelectedCityTodayForecastContainer;