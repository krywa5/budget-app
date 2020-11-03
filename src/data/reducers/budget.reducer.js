import {
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,

    BUDGETED_CATEGORIES_GET_REQUEST,
    BUDGETED_CATEGORIES_GET_SUCCESS,
    BUDGETED_CATEGORIES_GET_FAILURE,

    LOADING_STATES,
} from 'data/constants';

const initState = {
    loadingState: null,
    budget: {},
    budgetedCategories: [],
};

const budget = (state = initState, action) => {
    const { type, payload } = action;

    const newLoadingState = { ...state.loadingState };

    switch (type) {
        case BUDGET_GET_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [type]: LOADING_STATES.LOADING,
                }
            }

        case BUDGET_GET_SUCCESS:
            delete newLoadingState.BUDGET_GET_REQUEST;

            return {
                ...state,
                budget: payload,
                loadingState: newLoadingState,
            };

        case BUDGET_GET_FAILURE:
            delete newLoadingState.BUDGET_GET_REQUEST;

            return {
                ...state,
                budget: {},
                loadingState: newLoadingState,
            };

        case BUDGETED_CATEGORIES_GET_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [type]: LOADING_STATES.LOADING,
                }
            }

        case BUDGETED_CATEGORIES_GET_SUCCESS:
            delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST;

            return {
                ...state,
                budgetedCategories: payload,
                loadingState: newLoadingState,
            };

        case BUDGETED_CATEGORIES_GET_FAILURE:
            delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST;

            return {
                ...state,
                budgetedCategories: [],
                loadingState: newLoadingState,
            };

        default:
            return state;


    }
}

export default budget;