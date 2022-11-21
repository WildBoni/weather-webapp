import React from 'react';
import styled, {keyframes} from 'styled-components';
import {slideInRight} from 'react-animations';

const Animation = keyframes`${slideInRight}`;

const List = styled.li`
  animation: 0.3s ${Animation};
  position: relative;
  padding: 10px 40px 10px 20px;
  background-color: #494949;
  margin: 5px 0;
`
const Text = styled.p`
  color: white;
  display: inline-block;
`
const Button = styled.button`
  cursor: pointer;
  padding: 0 10px;
  position: absolute;
  top: 0;
  border: none;
  background-color: red;
  color: white;
  height: 100%;
  right: 0;
  &:hover {
    background-color: #8b0d0d;
  }
`

let Toast = (props) => {
  return(
    <List>
      <Text>{props.text}</Text>
      <Button onClick={props.onDismissClick}>X</Button>
    </List>
  )
}

export default Toast;