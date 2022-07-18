import React from "react";

import Modal from "../components/Modal/Modal";

import { ModalValue } from "../types/types";

const useModal = (): ModalValue => {
  const [visible, setVisible] = React.useState(false);
  const [content, setContent] = React.useState<JSX.Element | null>(null);

  const showModal = (): void => setVisible(true);

  const closeModal = () => setVisible(false);

  const renderModalContent = () => (visible ? <Modal content={content} closeModal={closeModal} /> : null);

  return { showModal, closeModal, renderModalContent, setContent };
};

export default useModal;
