import {
    SET_SELECTED_PARENT_CATEGORY_ID,
} from 'data/constants';

const initState = {
    selectedParentCategoryId: undefined,
};

const budget = (state = initState, action) => {
    const { type } = action;

    switch (type) {
        case SET_SELECTED_PARENT_CATEGORY_ID:
            return {
                ...state,
                selectedParentCategoryId: action.payload
            }

        default:
            return state;


    }
}

export default budget;