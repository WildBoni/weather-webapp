import styled from 'styled-components';
import{useContext} from 'react';
import {ThemeContext} from 'styled-components';

const Panel = styled.div`
  order: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  span {
    color: white;
  } 
  
  @media (min-width: 996px) {
    order: 0;
    // border-radius: 0 25px 25px 0;
    // box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17);
    display: flex;
    // top: 90px;
    // left: -50px;
    flex-direction: column;
    padding: 25px;
    // position: absolute;
    background: ${props => props.styles.purpleGradient};
  }
`
let Image = styled.img`
  max-width: 85px;
  @media (min-width: 390px) {
    max-width: none;
  }
  @media (min-width: 996px) {
    order: 2;
    max-width: 85px;
  }
`
let Text = styled.span`
  font-size: 80px;
  font-weight: 700;
  @media (min-width: 390px) {
    font-size: 100px;
  }
  @media (min-width: 996px) {
    font-size: 50px;
  }
`

function SelectedCityTemperature(props){
  const themeContext = useContext(ThemeContext);

  return(
    <Panel styles={themeContext}>
      <Image src={`${props.data.iconUrl}@4x.png`} alt={props.data.weather} />
      <Text>{props.data.temperature}°</Text>
    </Panel>
  )
}

export default SelectedCityTemperature;