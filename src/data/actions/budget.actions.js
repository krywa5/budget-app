import {
    BUDGET_GET,
    BUDGETED_CATEGORIES_GET,

    SET_SELECTED_PARENT_CATEGORY_ID,

    BUDGET_TRANSACTION_ADD
} from 'data/constants';

import API from 'data/fetch';

export const fetchBudget = id => {
    const promise = API.budget.fetchBudget(null, { id });

    return {
        type: BUDGET_GET,
        promise,
    }
}

export const fetchBudgetedCategories = id => {
    const promise = API.budget.fetchBudgetedCategories(null, { id });

    return {
        type: BUDGETED_CATEGORIES_GET,
        promise,
    };
}

export const addTransaction = ({ budgetId, data, translation }) => {
    // prop translation to funkcja t z useTranslation()

    const message = translation && typeof translation === 'function' ? translation("Transaction has been added!") : "Transaction has been added!";

    const promise = API.budget.addTransaction({
        budgetId,
        data
    });

    return {
        type: BUDGET_TRANSACTION_ADD,
        promise,
        successMessage: message,
    }
}

export const selectParentCategory = id => {
    return {
        type: SET_SELECTED_PARENT_CATEGORY_ID,
        payload: id
    }
}
