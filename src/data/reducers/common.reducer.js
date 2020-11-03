import {
    ALL_CATEGORIES_GET_REQUEST,
    ALL_CATEGORIES_GET_SUCCESS,
    ALL_CATEGORIES_GET_FAILURE,
    LOADING_STATES
} from 'data/constants';

const initState = {
    loadingState: null,
    allCategories: [],
};

const common = (state = initState, action) => {
    const { type, payload } = action;

    const newLoadingState = { ...state.loadingState };

    switch (type) {
        case ALL_CATEGORIES_GET_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [type]: LOADING_STATES.LOADING,
                }
            }

        case ALL_CATEGORIES_GET_SUCCESS:
            delete newLoadingState.ALL_CATEGORIES_GET_REQUEST;

            return {
                ...state,
                allCategories: payload,
                loadingState: newLoadingState,
            };

        case ALL_CATEGORIES_GET_FAILURE:
            delete newLoadingState.ALL_CATEGORIES_GET_REQUEST;

            return {
                ...state,
                allCategories: [],
                loadingState: newLoadingState,
            };

        default:
            return state;
    }
}

export default common;