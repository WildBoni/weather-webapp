import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Toast from "./Toast";
import {removeToast} from "../features/toastsSlice";
import styled from 'styled-components';

let Wrapper = styled.ul`
  list-style-type: none;
  position: fixed;
  top: 0;
  right: 10px;
`

let Toasts = ({actions,toasts}) => {
  const {removeToast} = actions;
  return(
    <Wrapper>
      {toasts.map(toast => {
        const{id} = toast;
        return(
          <Toast {...toast} key={id} onDismissClick={() => removeToast(id)}/>
        )
      })}
    </Wrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ removeToast }, dispatch)
});

const mapStateToProps = state => ({
  toasts: state.toasts
});

export default connect(mapStateToProps, mapDispatchToProps)(Toasts);