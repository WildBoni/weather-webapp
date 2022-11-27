import {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components';
import {ModalContext} from "../../context/modalContext";
import { PlusSquare } from '@styled-icons/bootstrap';

const Button = styled.button`
	align-items: center;
	background-color: transparent;
	border: none;
	color: gray;
	cursor:pointer;
	display: flex;
	gap: 10px;
	font-size: ${props => props.styles.bigger};
	font-weight: 600;
	margin: 30px auto;
	// &:before { 
	// 	content: url(/images/Plus.png); 
	// 	padding-right: 15px;
	// }
	&:focus {
		outline: 0;
	}
	@media(min-width:996px) {
		color: white;
		margin: 0 auto;
	}	
`

const StyledPlusSquare = styled(PlusSquare)`
  height: 20px;
`

function AddCity() {
	let {handleModal} = useContext(ModalContext);
	const themeContext = useContext(ThemeContext);
	
	return(
		<>
			<Button styles={themeContext}
				onClick={() => handleModal('Write a city name')}
			>
				<StyledPlusSquare />
				Add another city
			</Button>
		</>
	)
}

export default AddCity;