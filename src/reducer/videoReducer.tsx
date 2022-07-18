import { VideoAction, VideoState } from "../types/types";
import { setStructureVideoData, isNotDuplicate } from "../helpers/auxiliaryFunctions";

const videoReducer = (state: VideoState[], action: VideoAction): VideoState[] => {
  switch (action.type) {
    case "ADD":
      return isNotDuplicate(state, action.payload) ? [...state, setStructureVideoData(action.payload)] : [...state];

    case "REMOVE":
      return state.filter((item) => item.id !== action.payload);

    case "TOGGLE_FAVORITE": {
      const { id, ...rest }: any = action.payload;

      return state.map((item) => (item.id === id ? { ...item, ...rest } : item));
    }
    case "CLEAR":
      return [];

    case "SORT_FROM_NEWEST":
      return [...state.sort((a, b) => Date.parse(b.dateAdded) - Date.parse(a.dateAdded))];

    case "SORT_FROM_ELDEST":
      return [...state.sort((a, b) => Date.parse(a.dateAdded) - Date.parse(b.dateAdded))];

    default:
      return state;
  }
};

export default videoReducer;
