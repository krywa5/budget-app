export const fetchBudget = async (key, { id }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`);
    const data = await response.json();

    return data;
}

export const fetchBudgetedCategories = async (key, { id }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/budgetCategories`);
    const data = await response.json();

    return data;
}

export const addTransaction = async ({ budgetId, data }) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/budgets/${budgetId}/transactions`,
        {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    );
    const responseData = await response.json();

    return responseData;
}

export const deleteTransaction = async transactionId => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/transactions/${transactionId}`,
        {
            method: "DELETE",
        }
    );
    const data = await response.json();

    return data;
}

export const editTransaction = async ({ transactionId, data }) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/transactions/${transactionId}`,
        {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    );
    const dataOutput = await response.json();

    return dataOutput;
}