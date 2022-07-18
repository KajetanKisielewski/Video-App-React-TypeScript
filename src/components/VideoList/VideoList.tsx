import React from "react";

import VideoItem from "../VideoItem/VideoItem";
import VideoContext from "../../context/VideoContext";

const VideoList = () => {
  const context = React.useContext(VideoContext);

  if (!context) return null;

  const { videos, showFavorite } = context;

  const renderAllVideoItems = () =>
    videos?.map((video) => <VideoItem key={video.id} videoData={video} />);

  const renderFavVideoItems = () =>
    videos?.map((video) =>
      video.isFavorite ? <VideoItem key={video.id} videoData={video} /> : null
    );

  const renderVideoItems = () =>
    showFavorite ? renderFavVideoItems() : renderAllVideoItems();

  return <>{renderVideoItems()}</>;
};

export default VideoList;
