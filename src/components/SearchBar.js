import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components';
import { XCircle } from '@styled-icons/bootstrap';

const Content = styled.div`
	margin: 20px 20px;
	display: flex;
	gap: 20px;
	position: absolute;
	bottom: 0;
`
const Title = styled.h2`
	color: white;
	font-size: 20px;
	padding: 0;
	width: 40%;
`
const SearchInput = styled.div`
	position: relative;
	width: 60%;
`
const Input = styled.input`
	border: none;
	box-sizing: border-box;
	box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17);
	color: #4f4f4f;
	font-size: 20px;
	font-weight: 600;
	width: 100%;
	padding: 10px 20px;
	&:focus {
		outline: none;
	}
`
const StyledXCircle = styled(XCircle)`
	cursor: pointer;
	height: 20px;
	position: absolute;
	right: 8px;
	top: 12px;
`

function SearchBar(props) {
	const themeContext = useContext(ThemeContext);

	return(
		<Content>
			<Title styles={themeContext}>Filtra elenco</Title>
			<SearchInput>
				<Input type="text" placeholder="ex: Miami" onChange={props.onChange} value={props.value}/>
				<StyledXCircle onClick={props.clearFilter}/>
			</SearchInput>
		</Content>
	)
}

export default SearchBar;