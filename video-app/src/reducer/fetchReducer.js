import { FETCH_ACTIONS } from '../helpers/reducersActions';

const fetchReducer = (state, { type, payload }) => {
    switch (type) {
        case FETCH_ACTIONS.API_REQUEST:
            return { ...state, loading: true };
        case FETCH_ACTIONS.FETCH_DATA:
            return { ...state, fetchedData: payload, loading: false };
        case FETCH_ACTIONS.ERROR:
            return { ...state, error: payload };
        default:
            return state;
    }
};

export default fetchReducer;
