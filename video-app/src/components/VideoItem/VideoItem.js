import React from 'react';
import { Button } from 'reactstrap';

import Confirmation from '../Confirmation/Confirmation';

import VideoContext from '../../context/VideoContext';
import { VIDEO_ACTIONS } from '../../helpers/reducersActions';
import {
    convertDate,
    setIframeStructure,
    setClassNameModifier,
} from '../../helpers/auxiliaryFunctions';

import './videoItem.css';

const VideoItem = ({ videoData }) => {
    const [favorite, setFavorite] = React.useState(false);

    const { id, title, likeCount, viewCount, videoThumb, dateAdded, player } = videoData;
    const { setContent, showModal, dispatch, listView } = React.useContext(VideoContext);

    const removeVideo = () => {
        setContent(<Confirmation id={id} />);
        showModal();
    };

    const highlightFavoriteVideo = (e) => {
        const itemClassList = e.target.classList;

        return itemClassList.contains('button__icon--favorites')
            ? itemClassList.remove('button__icon--favorites')
            : itemClassList.add('button__icon--favorites');
    };

    const toggleFavoriteState = (value) => {
        dispatch({
            type: VIDEO_ACTIONS.TOGGLE_FAVORITE,
            payload: { id, isFavorite: value },
        });
    };

    const handleSetFavoritesVideo = (e, value) => {
        setFavorite(true);
        toggleFavoriteState(!value);
        highlightFavoriteVideo(e);
    };

    const watchVideo = () => {
        const iframe = setIframeStructure(player);
        setContent(iframe);
        showModal();
    };

    const renderVideoItem = () => (
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
            <Button
                className={`video__button--${setClassNameModifier(listView)}`}
                onClick={watchVideo}
                title="Watch it"
            >
                <i className={`fa-solid fa-play button__icon--${setClassNameModifier(listView)}`} />
            </Button>
            <Button
                className={`video__button--${setClassNameModifier(listView)}`}
                onClick={removeVideo}
                title="Remove"
            >
                <i
                    className={`fa-solid fa-trash-can button__icon--${setClassNameModifier(
                        listView,
                    )}`}
                />
            </Button>
            <Button
                className={`video__button--${setClassNameModifier(listView)}`}
                onClick={(e) => handleSetFavoritesVideo(e, favorite)}
                title="Add to favorites"
            >
                <i
                    className={`fa-solid fa-heart button__icon--${setClassNameModifier(listView)}`}
                />
            </Button>
        </div>
    );

    return <>{renderVideoItem()}</>;
};

export default VideoItem;
