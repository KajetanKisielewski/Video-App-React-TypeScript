import React, { useContext } from 'react';
import { Button } from 'reactstrap';

import VideoContext from '../../context/VideoContext';
import { VIDEO_ACTIONS } from '../../helpers/reducersActions';

import './confirmation.css';

const Confirmation = (props) => {
    const { id = null } = props;

    const { dispatch, closeModal } = useContext(VideoContext);

    const setParagraphContent = () => (id ? 'Remove video?' : 'Clear the board?');

    const clearBoard = () => {
        dispatch({ type: VIDEO_ACTIONS.CLEAR });
        return closeModal();
    };

    const removeTask = () => {
        dispatch({ type: VIDEO_ACTIONS.REMOVE, payload: id });
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
