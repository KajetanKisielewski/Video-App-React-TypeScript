import React from 'react';
import { Button } from 'reactstrap';
import VideoContext from '../../context/VideoContext';
import { VIDEO_ACTIONS } from '../../helpers/reducersActions';
import { createDemosList } from '../../helpers/auxiliaryFunctions';
import Confirmation from '../Confirmation/Confirmation';

import './videoToolbox.css';

const VideoToolbox = () => {
    const {
        setContent,
        showModal,
        closeModal,
        dispatch,
        setListView,
        setUrl,
        setCurrentPage,
        setShowFavorite,
        videos,
    } = React.useContext(VideoContext);

    const clearVideoList = () => {
        setContent(<Confirmation closeModal={closeModal} />);
        setCurrentPage(1);
        showModal();
        setShowFavorite(false);
    };

    const sortFromNewest = () => {
        dispatch({ type: VIDEO_ACTIONS.SORT_FROM_NEWEST });
    };

    const sortFromEldest = () => {
        dispatch({ type: VIDEO_ACTIONS.SORT_FROM_ELDEST });
    };

    const setDemoVideoList = () => {
        const demos = createDemosList();
        setUrl(demos);
        setCurrentPage(1);
        setShowFavorite(false);
    };

    return (
        <div className="toolbox__actions shadow p-3 mb-5 bg-white rounded">
            <Button
                className="actions actions__clear"
                onClick={clearVideoList}
                disabled={!videos.length}
            >
                Clear list
            </Button>
            <Button className="actions actions__upload" onClick={setDemoVideoList}>
                Upload a demo
            </Button>
            <Button
                className="actions actions__newest"
                onClick={sortFromNewest}
                disabled={!videos.length}
            >
                Sort from the newest
            </Button>
            <Button
                className="actions actions__eldest"
                onClick={sortFromEldest}
                disabled={!videos.length}
            >
                Sort from the oldest
            </Button>
            <Button
                className="actions actions__list"
                onClick={() => setListView(true)}
                disabled={!videos.length}
            >
                View: List
            </Button>
            <Button
                className="actions actions__tiles"
                onClick={() => setListView(false)}
                disabled={!videos.length}
            >
                View: tiles
            </Button>
        </div>
    );
};

export default VideoToolbox;
