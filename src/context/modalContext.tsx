import React, { createContext } from 'react';
import useModal from "../hooks/useModal";
import Modal from "../components/ui/Modal";

interface IModalContext {};

let ModalContext  = createContext<IModalContext>({} as IModalContext);;

let ModalProvider = ({children} : {children?: React.ReactNode}) => {
  let {modal, handleModal, modalContent, addCity, handleChange, handleKeyPress} = useModal();
  
  return (
    <ModalContext.Provider value={{modal, handleModal, modalContent, addCity, handleChange, handleKeyPress}}>
      <Modal/>
      {children}
    </ModalContext.Provider>
  )
}

export {ModalContext, ModalProvider};