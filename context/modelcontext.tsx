import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext({
  isModalVisible: false,
  openModal: () => {},
  closeModal: () => {},
});

// Custom hook for easy access
export const useModal = () => useContext(ModalContext);

interface Props {
  children: React.ReactNode;
}

export const ModalProvider = ({ children }:Props) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <ModalContext.Provider value={{ isModalVisible, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
