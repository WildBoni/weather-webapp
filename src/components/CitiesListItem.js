import {useContext} from 'react';
import styled, {ThemeContext, keyframes} from 'styled-components';
import {fadeInDown} from 'react-animations';
import {Link} from 'react-router-dom';
import {weatherBackgroundColor} from '../shared/weatherBackgroundColor';

const Animation = keyframes`${fadeInDown}`;

const Container = styled.div`
	position: relative;
	animation: 0.3s ${Animation};
`
const Button = styled.button`
    background-color: #b31212;
    border: none;
    color: white;
		cursor: pointer;
    font-size: 18px;
    position: absolute;
    height: 40px;
    position: absolute;
		right: 20px;
    top: 0;
    width: 40px;
		@media(min-width:996px) {
			height: 30px;
			width: 30px;
		}
		&:hover {
			background-color: #611010;
		}
		&:focus {
			outline: 0;
		}

`
const Article = styled.article`
	align-items: center;
	background: ${props => props.styles[props.cardColor]};
	color: white;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: 20px;	
	padding: 25px;
	@media(min-width:996px) {
		// margin-right: 0;
	}	
`
const Details = styled.div`
	flex-basis: 0;
	flex-grow: 1;
`
const Weather = styled.div`
	flex-basis: 0;
	flex-grow: 1;
	text-align: center;
`
const Temperature = styled.div`
	flex-basis: 0;
	flex-grow: 1;
	text-align: right;
`

function CitiesListItem(props) {
	const themeContext = useContext(ThemeContext);
	let details = props.details;
	let cardColor = weatherBackgroundColor(details.icon);
	return(
		<Container>
			<Button onClick={() => props.onRemoveCity(details.id)}>X</Button>
			<Link onClick={() => props.onSelectCity(details.id)} to={`/city/${details.id}`}>
				<Article className="city-box" styles={themeContext} cardColor={cardColor}>
					<Details>
						<h2>{details.name}</h2>
						<p>{details.time}</p>
						<p className="small-text">{details.hour}</p>
					</Details>
					<Weather>
						<img src={`${details.iconUrl}@2x.png`} alt={details.weather}/>
					</Weather>
					<Temperature className="big-text">
						{details.temperature}°
					</Temperature>
				</Article>
			</Link>
		</Container>
	)
}

export default CitiesListItem;