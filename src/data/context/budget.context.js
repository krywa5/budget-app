import React, { createContext, useReducer } from 'react';
import { SELECT_PARENT_CATEGORY_ID } from 'data/constants';

const initialValue = {};

export const budgetContext = createContext(initialValue);
const { Provider } = budgetContext;


const reducer = (state, action) => {
    switch (action.type) {
        case SELECT_PARENT_CATEGORY_ID:
            return {
                ...state,
                selectedParentCategoryId: action.payload,
            }

        default:
            return state;
    }
}

const BudgetProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialValue);

    return (
        <Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {children}
        </Provider>
    );
}

export default BudgetProvider;