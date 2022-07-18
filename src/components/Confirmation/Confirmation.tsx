import React from "react";
import { Button } from "reactstrap";

import VideoContext from "../../context/VideoContext";
import { ConfirmationProps } from "../../types/types";

import "./confirmation.css";

const Confirmation = (props: ConfirmationProps) => {
  const { id = null } = props;

  const context = React.useContext(VideoContext);

  if (!context) return null;
  const { dispatch, closeModal } = context;

  const setParagraphContent = (): string => (id ? "Remove video?" : "Clear the board?");

  const clearBoard = (): Function => {
    dispatch({ type: "CLEAR" });
    return closeModal();
  };

  const removeTask = (): Function => {
    dispatch({ type: "REMOVE", payload: id });
    return closeModal();
  };

  const handleRemove = () => (id ? removeTask() : clearBoard());

  return (
    <>
      <p className="modal__paragraph">{setParagraphContent()}</p>
      <div className="modal__actions">
        <Button className="modal__confirm" onClick={handleRemove}>
          YES
        </Button>
        <Button className="modal__cancel" onClick={() => closeModal()} type="button">
          NO
        </Button>
      </div>
    </>
  );
};

export default Confirmation;
