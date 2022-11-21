import React from 'react';
import{useContext} from 'react';
import {ThemeContext} from 'styled-components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {StyledIconBase} from '@styled-icons/styled-icon';
import { House, GeoAlt, Search } from '@styled-icons/bootstrap';

const Menu = styled.nav`
  background-color: white;
  border-radius: 25px;
  display: flex;
  justify-content: space-evenly;
  list-style-type: none;
  margin: 30px 20px;
  padding: 0 25px;
`
const Item = styled.button.attrs(props => ({
  underline: props.underline || '0'
  }))`
  border: none;
  border-bottom: ${props => props.underline} solid ${props => props.styles.blue};
  background-color: white;
  display: inline;
  flex-grow: 1;
  max-width: 75px;
  padding: 25px;
  cursor: pointer;
  text-align: center;
  &:focus {
    outline: 0;
    border-bottom: 2px solid ${props => props.styles.blue};
  }
  &:hover {
    border-bottom: 2px solid ${props => props.styles.blue};
  }
`

export const IconStyleWrapper = styled.div`
  ${StyledIconBase} {
    color: #5a5b66;
    height: 30px;
  }
`

function MobileMenuBar(props) {
  const themeContext = useContext(ThemeContext);

  return(
    <Menu>
      {/* <Link to="/">
        <Item underline="2px" styles={themeContext}>
          <IconStyleWrapper>
            <House />
          </IconStyleWrapper>
        </Item>
      </Link> */}
      <Item onClick={props.toggleSearchbar} styles={themeContext}>
        <IconStyleWrapper>
          <Search />
        </IconStyleWrapper>
      </Item>
      <Item onClick={props.geolocation} styles={themeContext}>
        <IconStyleWrapper>
          <GeoAlt />
        </IconStyleWrapper>
      </Item>
    </Menu>
  )
}

export default MobileMenuBar;