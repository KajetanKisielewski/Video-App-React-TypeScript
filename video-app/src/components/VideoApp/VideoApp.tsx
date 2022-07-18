/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Container, Row, Col } from "reactstrap";

import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import VideoToolbox from "../VideoToolbox/VideoToolbox";
import VideoList from "../VideoList/VideoList";
import VideoPagination from "../VideoPagination/VideoPagination";

import { useFetch, useLocalStorage, useModal, useGenerateFetchParameters } from "../../hooks";

import { videoReducer } from "../../reducer";
import VideoContext from "../../context/VideoContext";
import {
  generateVideosToDisplay,
  generatePageNumbers,
  renderFavouriteVideosSubheading,
  renderAllVideoSubheading,
  setClassNameModifier,
} from "../../helpers/auxiliaryFunctions";

import { VideoContextValues } from "../../types/types";

import "./videoApp.css";

const VideoApp = () => {
  const { showModal, closeModal, renderModalContent, setContent } = useModal();
  const [getLocalStorage, setLocalStorage] = useLocalStorage();
  const [setUrl, generatedParameters] = useGenerateFetchParameters();
  const { fetchedData, loading } = useFetch(generatedParameters);

  const [videos, dispatch] = React.useReducer(videoReducer, getLocalStorage() || []);

  const [showFavorite, setShowFavorite] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [listView, setListView] = React.useState(false);
  const [videosQuantityPerPage, setVideosQuantityPerPage] = React.useState(6);

  React.useEffect(() => {
    if (fetchedData?.length !== 0) {
      dispatch({ type: "ADD", payload: fetchedData });
    }
  }, [fetchedData]);

  React.useEffect(() => {
    setLocalStorage(videos);
  }, [videos]);

  const contextValues: VideoContextValues = React.useMemo(
    (): VideoContextValues => ({
      setShowFavorite,
      setCurrentPage,
      currentPage,
      pageNumbers: generatePageNumbers({ videos, showFavorite, currentPage, videosQuantityPerPage }),
      setUrl,
      setContent,
      showModal,
      closeModal,
      dispatch,
      setListView,
      videos: generateVideosToDisplay({ currentPage, videos, videosQuantityPerPage }),
      showFavorite,
      listView,
      setVideosQuantityPerPage,
    }),
    [closeModal, currentPage, listView, setContent, setUrl, showFavorite, showModal, videos, videosQuantityPerPage]
  );

  return (
    <VideoContext.Provider value={contextValues}>
      <Container fluid className="wrap">
        <Row className="header">
          <Col className="header__col">
            <NavBar />
            <SearchBar />
            <VideoToolbox />
          </Col>
        </Row>
        <Row className="main shadow p-3 mb-5 bg-white rounded">
          <Col className={`main__col main__col--${setClassNameModifier(listView)}`}>
            <h2 className="main__heading">{showFavorite ? "Favorite Videos" : "Videos List"}</h2>
            <h3 className="main__subheading--loading">{loading && "Loading..."}</h3>
            {renderAllVideoSubheading({ videos, showFavorite })}
            {renderFavouriteVideosSubheading({ videos, showFavorite })}
            <VideoList />
          </Col>
        </Row>
        <Row>
          <Col>
            <VideoPagination />
          </Col>
        </Row>
        {renderModalContent()}
      </Container>
    </VideoContext.Provider>
  );
};

export default VideoApp;
