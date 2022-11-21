import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  display: ${props => props.visible ? 'block' : 'none'};
  margin: 0 auto;
  padding: 30px 0 0 0;
  text-align: center;
  input {
    padding: 10px 10px;
    font-size: 18px;
  }
`
const Button = styled.button`
  margin-top: 10px;
  padding: 12px 30px;
  font-size: 18px;
  background-color: ${props => props.close ? "#b31212" : "#15908c"};
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.close ? "#611010" : "#065856"};
  }
`

function FilterSelectedCities({handleClose, show, children, clearFilter}) {
  return(
    <Content visible={show}>
      {children}
      <Button onClick={clearFilter}>Reset</Button>
      <Button close onClick={handleClose}>Close</Button>
    </Content>
  )
}

export default FilterSelectedCities;