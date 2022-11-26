import {useDispatch, useSelector} from 'react-redux';
import Toast from "./ui/Toast";
import {removeToast} from "../features/toastsSlice";
import styled from 'styled-components';

let Wrapper = styled.ul`
  list-style-type: none;
  position: fixed;
  top: 0;
  right: 10px;
`

let Toasts = () => {
  let dispatch = useDispatch();
  const toasts = useSelector(state => state.toasts);

  return(
    <Wrapper>
      {toasts.map(toast => {
        const{id} = toast;
        return(
          <Toast {...toast} key={id} onDismissClick={() => dispatch(removeToast(id))}/>
        )
      })}
    </Wrapper>
  )
}

export default Toasts