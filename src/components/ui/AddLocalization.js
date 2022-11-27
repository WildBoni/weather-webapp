import {useContext} from 'react';
import {ThemeContext} from 'styled-components';
import styled from 'styled-components';
import { GeoAlt } from '@styled-icons/bootstrap';

const Content = styled.div`
	margin: 20px 20px;
`
const Button = styled.button`
	border-radius: 10px;
	border: none;
	background: ${props => props.styles.purpleGradient};
	box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17);
	color: white;
	cursor: pointer;
	font-size: 20px;
	width: 100%;
	padding: 20px 20px;
	&:focus {
		outline: none;
	}
`

const StyledGeoAlt = styled(GeoAlt)`
	margin-right: 10px;
	height: 25px;
`

function AddLocalization(props) {
	const themeContext = useContext(ThemeContext); 
	return(
		<Content>
			<Button onClick={props.geolocation} styles={themeContext}>
				<StyledGeoAlt />
				Add my position
			</Button>
		</Content>
	)
}

export default AddLocalization;