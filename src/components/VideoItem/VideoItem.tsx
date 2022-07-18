import React from "react";
import { Button } from "reactstrap";

import Confirmation from "../Confirmation/Confirmation";

import VideoContext from "../../context/VideoContext";
import { convertDate, setIframeStructure, setClassNameModifier } from "../../helpers/auxiliaryFunctions";

import { VideoData } from "../../types/types";

import "./videoItem.css";

const VideoItem = ({ videoData }: VideoData) => {
  const [favorite, setFavorite] = React.useState(false);

  const { id, title, likeCount, viewCount, videoThumb, dateAdded, player } = videoData;

  const context = React.useContext(VideoContext);
  if (!context) return null;

  const { setContent, showModal, dispatch, listView } = context;

  const removeVideo = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setContent(<Confirmation id={id} />);
    showModal();
  };

  const highlightFavoriteVideo = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const itemClassList = event.currentTarget.classList;

    return itemClassList.contains("button__icon--favorites")
      ? itemClassList.remove("button__icon--favorites")
      : itemClassList.add("button__icon--favorites");
  };

  const toggleFavoriteState = (value: boolean): void => {
    dispatch({
      type: "TOGGLE_FAVORITE",
      payload: { id, isFavorite: value },
    });
  };

  const handleSetFavoritesVideo = (event: React.MouseEvent<HTMLButtonElement>, value: boolean): void => {
    setFavorite(true);
    toggleFavoriteState(!value);
    highlightFavoriteVideo(event);
  };

  const watchVideo = (event: React.MouseEvent<HTMLButtonElement | HTMLImageElement>): void => {
    const iframe = setIframeStructure(player);
    setContent(iframe);
    showModal();
  };

  const renderVideoItem = (): JSX.Element => (
    <div
      className={`main__video--${setClassNameModifier(listView)}
            shadow p-3 mb-5 bg-white rounded`}
    >
      <h3 className={`video__title--${setClassNameModifier(listView)}`} title={title}>
        {title}
      </h3>
      <ul className={`video__list--${setClassNameModifier(listView)}`}>
        <li className={`list__item list__item--${setClassNameModifier(listView)}`}>
          <img
            className={`item__img--${setClassNameModifier(listView)}`}
            src={videoThumb}
            alt="video thumbnail"
            onClick={watchVideo}
            role="presentation"
          />
        </li>
        <li className="list__item">Likes: {likeCount}</li>
        <li className="list__item">Vievs: {viewCount}</li>
        <li className="list__item">Added at: {convertDate(dateAdded)}</li>
      </ul>
      <Button className={`video__button--${setClassNameModifier(listView)}`} onClick={watchVideo} title="Watch it">
        <i className={`fa-solid fa-play button__icon--${setClassNameModifier(listView)}`} />
      </Button>
      <Button className={`video__button--${setClassNameModifier(listView)}`} onClick={removeVideo} title="Remove">
        <i className={`fa-solid fa-trash-can button__icon--${setClassNameModifier(listView)}`} />
      </Button>
      <Button
        className={`video__button--${setClassNameModifier(listView)}`}
        onClick={(e) => handleSetFavoritesVideo(e, favorite)}
        title={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <i className={`fa-solid fa-heart button__icon--${setClassNameModifier(listView)}`} />
      </Button>
    </div>
  );

  return <>{renderVideoItem()}</>;
};

export default VideoItem;
