import { VIDEO_ACTIONS } from '../helpers/reducersActions';
import { setStructureVideoData, isNotDuplicate } from '../helpers/auxiliaryFunctions';

const videoReducer = (state, { type, payload }) => {
    switch (type) {
        case VIDEO_ACTIONS.ADD:
            return isNotDuplicate(state, payload)
                ? [...state, setStructureVideoData(payload)]
                : [...state];

        case VIDEO_ACTIONS.REMOVE:
            return state.filter((item) => item.id !== payload);

        case VIDEO_ACTIONS.TOGGLE_FAVORITE: {
            const { id, ...rest } = payload;

            return state.map((item) => (item.id === id ? { ...item, ...rest } : item));
        }
        case VIDEO_ACTIONS.CLEAR:
            return [];

        case VIDEO_ACTIONS.SORT_FROM_NEWEST:
            return [...state.sort((a, b) => Date.parse(b.dateAdded) - Date.parse(a.dateAdded))];

        case VIDEO_ACTIONS.SORT_FROM_ELDEST:
            return [...state.sort((a, b) => Date.parse(a.dateAdded) - Date.parse(b.dateAdded))];

        default:
            return state;
    }
};

export default videoReducer;
