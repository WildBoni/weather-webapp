import {useContext} from 'react';
import styled from 'styled-components';
import { ModalContext } from "../../context/modalContext";

const ModalBackground = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.7);
  padding: 100px 0 0 0;
  text-align: center;
`
const Content = styled.div`
  position: relative;
  background-color: #ffffff;
  margin: 15% auto;
  padding: 20px 20px 40px 20px;
  border: 1px solid #888;
  width: 80%;
`
const Text = styled.div`
  font-size: 30px;
  padding: 20px 0;
`
const Input = styled.input`
  padding: 10px 10px;
  font-size: 18px;
`
const AddButton = styled.button`
  padding: 12px 30px;
  font-size: 18px;
  background-color: #15908c;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #065856;
  }
`
const CloseButton = styled.button`
  right: 0;
  top: -45px;
  padding: 12px 30px;
  font-size: 18px;
  background-color: #ec2121;
  border: none;
  color: white;
  cursor: pointer;
  position: absolute;
  &:hover {
    background-color: #b31010;
  }
`

function Modal() {
  
  let {modalContent, handleModal, modal, addCity, handleChange, handleKeyPress}: any = useContext(ModalContext);
  if(modal) {
    return(
      <ModalBackground>
        <Content>
          <CloseButton onClick={() => handleModal()}>Close</CloseButton>
          <Text>{modalContent}</Text>
          <Input type="text" onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}  onKeyPress={(e) => handleKeyPress(e)}/>
          <AddButton onClick={() => addCity()}>Add</AddButton>
        </Content>
      </ModalBackground>
    )
    } else return null;
}

export default Modal;