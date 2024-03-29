/* eslint-disable camelcase */

// @ts-ignore
import { v4 as uuid } from "uuid";

import {
  GeneratedFetchParametersForVimeo,
  GenerateVideosToDisplayData,
  VideoQuantityData,
  FetchState,
  VideoObject,
  VimeoVideoData,
  YoutubeVideoData,
  VideoState,
  VimeoVideoID,
  PageNumberData,
} from "../types/types";

const destructurizeYoutubeObject = (videoData: YoutubeVideoData): VideoObject => {
  const {
    id,
    snippet: { title, thumbnails },
    statistics: { viewCount, likeCount },
  } = videoData;

  return {
    title,
    videoThumb: thumbnails.medium.url,
    viewCount,
    likeCount,
    player: id,
  };
};

const destructurizeVimeoObject = (videoData: VimeoVideoData): VideoObject => {
  const {
    name,
    player_embed_url,
    metadata: {
      connections: {
        likes: { total },
      },
    },
    pictures: { base_link },
    stats: { plays },
  } = videoData;

  return {
    title: name,
    videoThumb: base_link,
    viewCount: plays.toString(),
    likeCount: total.toString(),
    player: player_embed_url,
  };
};

export const isNotDuplicate = (videoState: VideoState[], videoData: any): boolean => {
  const youtubeVideoTitle = videoData?.items?.[0]?.snippet?.title;
  const vimeoVideoTitle = videoData?.name;

  const title = youtubeVideoTitle || vimeoVideoTitle;

  return videoState.every((item) => item.title !== title);
};

export const setStructureVideoData = (videoData: any): VideoState => {
  const youTubeData = videoData?.items?.[0];
  const vimeoData = videoData;

  const { title, videoThumb, viewCount, likeCount, player } = youTubeData
    ? destructurizeYoutubeObject(youTubeData)
    : destructurizeVimeoObject(vimeoData);

  return {
    id: uuid(),
    title,
    videoThumb,
    viewCount,
    likeCount,
    player,
    dateAdded: new Date().toString(),
    isFavorite: false,
  };
};

// Functions for generate Fetch Parameters

const getYoutubeVideoID = (url: string): string => {
  const regex =
    /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;

  return url.replace(regex, `$1`);
};

const getVimeoVideoID = (url: string): VimeoVideoID => {
  const regex =
    /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_-]+)?/i;

  return url?.match(regex)?.[1];
};

const generateFetchParametersForYoutube = (url: string): string[] => {
  const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const baseURL = `https://www.googleapis.com/youtube/v3/videos`;
  const youtubeVideoID = getYoutubeVideoID(url);

  const path = `${baseURL}?id=${youtubeVideoID}&key=${KEY}&part=snippet,statistics&fields=items(id,snippet(title,thumbnails),statistics(viewCount,likeCount))`;

  return [path];
};

const generateFetchParametersForVimeo = (url: string): GeneratedFetchParametersForVimeo => {
  const KEY = process.env.REACT_APP_VIMEO_API_KEY;
  const baseURL = "https://api.vimeo.com/videos/";
  const vimeoVideoID = getVimeoVideoID(url);

  const path = `${baseURL}${vimeoVideoID}?fields=name,pictures.base_link,metadata.connections.likes.total,stats.plays,player_embed_url`;

  const options = {
    method: "GET",
    headers: {
      Authorization: `bearer ${KEY}`,
    },
  };

  return [path, options];
};

export const generateFetchParameters = (url: string): GeneratedFetchParametersForVimeo | string[] => {
  const youtubeIDLength = 11;
  const includedWord = "you";

  if (!url) return [];

  return url.length === youtubeIDLength || url.includes(includedWord)
    ? generateFetchParametersForYoutube(url)
    : generateFetchParametersForVimeo(url);
};

//  Functions for generate pagination dependencies

export const generateVideosToDisplay = ({ currentPage, videos, videosQuantityPerPage }: GenerateVideosToDisplayData): VideoState[] => {
  const videoPerPage = videosQuantityPerPage;

  const indexOfLastVideo = currentPage * videoPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videoPerPage;

  return videos?.slice(indexOfFirstVideo, indexOfLastVideo);
};

const generateVideoQuantity = ({ videos, showFavorite }: VideoQuantityData): number => {
  const favoriteVideosQuantity = videos?.filter((video) => video.isFavorite).length;
  const allVideosQuantity = videos?.length;

  return showFavorite ? favoriteVideosQuantity : allVideosQuantity;
};

export const generatePageNumbers = ({ videos, showFavorite, currentPage, videosQuantityPerPage }: PageNumberData): number[] => {
  const totalPagesToDisplay = 3;
  const videoPerPage = videosQuantityPerPage;
  const videosLength = generateVideoQuantity({ videos, showFavorite });
  const totalPages = Math.ceil(videosLength / videoPerPage);
  const maxPaginationItems = Math.min(totalPages, totalPagesToDisplay);
  const pageNumbers = [];

  if (currentPage === 1) {
    for (let i = currentPage; i <= maxPaginationItems + currentPage - 1; i += 1) {
      pageNumbers.push(i);
    }
  } else if (currentPage < totalPages) {
    for (let i = currentPage - 1; i < maxPaginationItems + currentPage - 1; i += 1) {
      pageNumbers.push(i);
    }
  } else {
    for (let i = currentPage; i > currentPage - maxPaginationItems; i -= 1) {
      pageNumbers.unshift(i);
    }
  }
  return pageNumbers;
};

// Functions for generate iframe

const generateVideoEmbedSrc = (player: string): string => {
  const vimeoEmbedVideoSrc = player;
  const youtubeEmbedVideoSrc = `https://www.youtube.com/embed/${player}`;
  const youtubeIDLength = 11;

  return player.length === youtubeIDLength ? youtubeEmbedVideoSrc : vimeoEmbedVideoSrc;
};

export const setIframeStructure = (player: string): JSX.Element => {
  const videoEmbedSrc = generateVideoEmbedSrc(player);

  return (
    <div className="iframe__wrapper">
      <iframe
        className="iframe__wrapper--iframe"
        width="853"
        height="480"
        src={videoEmbedSrc}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded video"
      />
    </div>
  );
};

// Headline management functions

export const renderAllVideoSubheading = ({ videos, showFavorite }: VideoQuantityData): JSX.Element | null =>
  !videos?.length && !showFavorite ? <h3 className="main__subheading--all">No videos have been added</h3> : null;

export const renderFavouriteVideosSubheading = ({ videos, showFavorite }: VideoQuantityData): JSX.Element | null =>
  !videos?.filter((video) => video.isFavorite).length && showFavorite ? (
    <h3 className="main__subheading--favorites">Favorite videos have not been selected</h3>
  ) : null;

//  Validation functions

export const isValidInputValue = (value: string): boolean => {
  const youtubeIDLength: number = 11;
  const vimeoUrlPattern = /(?:https?\\:\/\/)?(?:www\.)?(?:vimeo\.com\/)([0-9]+)/;
  const youtubeUrlPattern = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\\-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/;

  return !!(youtubeUrlPattern.test(value) || vimeoUrlPattern.test(value) || youtubeIDLength === value.length);
};

export const setValidationHint = (value: string): JSX.Element | null => {
  if (!value.length) return null;

  return (
    <span className="form__field--hint">
      {isValidInputValue(value) ? null : "The correct input value is youtube url, vimeo url, or youtube id."}
    </span>
  );
};

// single functions without categories

export const setInitState = (): FetchState => ({
  fetchedData: [],
  loading: false,
  error: null,
});

export const createDemosList = (): string[] => [
  "https://www.youtube.com/watch?v=J2ESK7wvS8U&ab_channel=SBMLabel",
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
  "https://www.youtube.com/watch?v=uXapuO0tgmc&ab_channel=DanMusic",
  "https://vimeo.com/653430917",
  "https://vimeo.com/721894139",
  "https://vimeo.com/716208763",
];

export const convertDate = (date: string): string => {
  return new Date(date).toISOString().slice(0, 10);
};

export const setClassNameModifier = (listView: boolean): string => {
  const tilesModifier = "tiles";
  const listModifier = "list";

  return listView ? listModifier : tilesModifier;
};

export const stopRedirect = (event: { preventDefault: () => void }) => {
  event.preventDefault();
};
