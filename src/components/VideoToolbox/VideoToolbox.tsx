import React from "react";
import { Button } from "reactstrap";

import Confirmation from "../Confirmation/Confirmation";

import VideoContext from "../../context/VideoContext";
import { createDemosList } from "../../helpers/auxiliaryFunctions";

import "./videoToolbox.css";

const VideoToolbox = () => {
  const context = React.useContext(VideoContext);

  if (!context) return null;

  const {
    setContent,
    showModal,
    dispatch,
    setListView,
    setUrl,
    setCurrentPage,
    setShowFavorite,
    videos,
  } = context;

  const clearVideoList = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setContent(<Confirmation />);
    setCurrentPage(1);
    showModal();
    setShowFavorite(false);
  };

  const sortFromNewest = (event: React.MouseEvent<HTMLButtonElement>): void => {
    dispatch({ type: "SORT_FROM_NEWEST" });
  };

  const sortFromEldest = (event: React.MouseEvent<HTMLButtonElement>): void => {
    dispatch({ type: "SORT_FROM_ELDEST" });
  };

  const setDemoVideoList = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
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
