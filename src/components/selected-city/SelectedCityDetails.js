import {useContext, useState, useEffect} from 'react';
import{ThemeContext} from 'styled-components';
import styled from 'styled-components';
import SelectedCityTodayDetails from './SelectedCityTodayDetails';
import {weatherBackgroundColor} from '../../shared/weatherBackgroundColor';
import SelectedCityTemperature from './SelectedCityTemperature';

const Section = styled.section`
	flex-direction: column;
	display: flex;
	grid-column: 1 / 3;
	align-self: stretch;
	justify-self: stretch;
	@media (min-width: 996px) {
		flex-direction: row;
	}
`

const Article = styled.article`
	color: white;
	padding-top: 20px;
	h1 {
		font-size: 32px;
		font-weight: 600;
		text-align: center;
	}
	h2 {
		font-size: 20px;
		text-align: center;
	}
	h3 {
		font-size: 20px;
		font-weight: 300;
		text-align: center;
	}
	@media (min-width: 996px) {
		// background-image: url("../images/background.jpg");
		// background-size: cover;
		// background-repeat: no-repeat;
		// background-position: left bottom;
		// border-radius: ${props => props.styles.borderRadius};
		background: ${props => props.styles[props.backgroundColor]};
		box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17);
		color: ${props => props.styles.red};
		padding: 50px;
		width: 100%;
		h1, h2, h3 {
			text-align: left;
		}
	}
`
function SelectedCityDetails(props) {
	const themeContext = useContext(ThemeContext); 
	let [backgroundColor, setBackgroundColor] = useState(props.current.weather[0].icon);
	
	useEffect(() => {
		let currentColor = weatherBackgroundColor(props.current.weather[0].icon);
		setBackgroundColor(currentColor);
	}, [props.current.weather[0].icon]);

	return (
		<Section>
			<SelectedCityTemperature data={props.details}/>
			<Article styles={themeContext} backgroundColor={backgroundColor}>
				<h1>{props.details.name}</h1>
				<h2>{props.details.time}</h2>
				<h3>{props.details.weather}</h3>
				<SelectedCityTodayDetails current={props.current} data={props.details}/>
			</Article>
		</Section>
	) 
}

export default SelectedCityDetails;