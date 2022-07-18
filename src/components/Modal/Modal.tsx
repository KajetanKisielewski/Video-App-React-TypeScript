import React from "react";
import ReactDom from "react-dom";

import { ModalProps } from "../../types/types";

import "./modal.css";

const Modal = (props: ModalProps): React.ReactPortal => {
  const { content, closeModal } = props;

  return ReactDom.createPortal(
    <>
      <div className="app__modal--overlay" onClick={() => closeModal()} role="presentation" />
      <div className="app__modal--content">
        {content}
        <button className="app__modal--button" type="button" title="Close" onClick={() => closeModal()}>
          x
        </button>
      </div>
    </>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
