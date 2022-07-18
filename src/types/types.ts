export type ConfirmationProps = {
  id?: null | string;
};

export type ModalProps = {
  content: JSX.Element | null;
  closeModal: Function;
};

export interface ModalValue {
  showModal: Function;
  closeModal: Function;
  renderModalContent: Function;
  setContent: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
}

export interface GenerateVideosToDisplayData {
  currentPage: number;
  videos: VideoState[];
  videosQuantityPerPage: number;
}

export interface VideoQuantityData {
  videos: VideoState[];
  showFavorite: boolean;
}

export interface PageNumberData {
  videos: VideoState[];
  showFavorite: boolean;
  currentPage: number;
  videosQuantityPerPage: number;
}

export type GeneratedFetchParametersForVimeo = [
  string,
  {
    method: string;
    headers: { Authorization: string };
  }
];

export type GeneratedParameters = (string[] | GeneratedFetchParametersForVimeo | undefined[])[];

export interface VideoContextValues {
  setShowFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  pageNumbers: number[];
  setUrl: React.Dispatch<React.SetStateAction<string[] | null>>;
  setContent: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
  showModal: Function;
  closeModal: Function;
  dispatch: React.Dispatch<VideoAction>;
  setListView: React.Dispatch<React.SetStateAction<boolean>>;
  videos: VideoState[];
  showFavorite: boolean;
  listView: boolean;
  setVideosQuantityPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface FetchState {
  fetchedData?: [];
  loading: boolean;
  error?: null | {};
}

export interface FetchAction {
  type: "API_REQUEST" | "FETCH_DATA" | "ERROR";
  payload?: [];
}

export interface VideoState {
  dateAdded: string;
  id: string;
  isFavorite: boolean;
  likeCount: string;
  player: string;
  title: string;
  videoThumb: string;
  viewCount: string;
}

export interface VideoData {
  videoData: VideoState;
}

export interface VideoAction {
  type: "ADD" | "REMOVE" | "TOGGLE_FAVORITE" | "CLEAR" | "SORT_FROM_NEWEST" | "SORT_FROM_ELDEST";
  payload?: {} | string | null;
}

export interface VideoObject {
  title: string;
  videoThumb: string;
  viewCount: string;
  likeCount: string;
  player: string;
}

export interface YoutubeVideoData {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
    likeCount: string;
  };
}

export interface VimeoVideoData {
  name: string;
  player_embed_url: string;
  metadata: {
    connections: {
      likes: {
        total: number;
      };
    };
  };
  pictures: {
    base_link: string;
  };
  stats: {
    plays: number;
  };
}

export type VimeoVideoID = string | null | undefined;
