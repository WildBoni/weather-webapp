// TODO: cleanup styles in components and add more default rules here
import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #1c193a;
    // background-color: ${props => props.theme.lightGray};
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1 {
    font-size: ${props => props.theme.title1};
    line-height: 42px;
    margin: 0;
    padding: 0;
  }

  h2 {
    font-size: ${props => props.theme.title2};
    line-height: 39px;
    margin: 0;
    padding: 0;
  }

  h3 {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }
  
  p {
    font-size: ${props => props.theme.default};
    line-height: 25px;
    margin: 0;
    padding: 0;
  }

  button {
    &:focus {
      outline: 0;
    }
  }

  .small-text {
    font-size: ${props => props.theme.small};
    line-height: 18px
  }

  .big-text {
    font-size: ${props => props.theme.important};
    font-weight: 600;
  }

  .huge-text {
    font-size: ${props => props.theme.huge};
    font-weight: 700;
  }

  .city-box {
    border-radius: ${props => props.theme.borderRadius};
    box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17);
  }

`
export default GlobalStyles;