import React from 'react';

import VideoItem from '../VideoItem/VideoItem';
import VideoContext from '../../context/VideoContext';

const VideoList = () => {
    const { videos, showFavorite } = React.useContext(VideoContext);

    const renderAllVideoItems = () =>
        videos?.map((video) => <VideoItem key={video.id} videoData={video} />);

    const renderFavVideoItems = () =>
        videos?.map((video) =>
            video.isFavorite ? <VideoItem key={video.id} videoData={video} /> : null,
        );

    const renderVideoItems = () => (showFavorite ? renderFavVideoItems() : renderAllVideoItems());

    return <>{renderVideoItems()}</>;
};

export default VideoList;
