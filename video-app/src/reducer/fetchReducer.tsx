import { FetchState, FetchAction } from "../types/types";

const fetchReducer = (state: FetchState, action: FetchAction): FetchState => {
  switch (action.type) {
    case "API_REQUEST":
      return { ...state, loading: true };
    case "FETCH_DATA":
      return { ...state, fetchedData: action.payload, loading: false };
    case "ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default fetchReducer;
