import React, { createContext, useState } from 'react';

const initialValue = {};
export const BudgetContext = createContext(initialValue);
const { Provider } = BudgetContext;

const BudgetProvider = ({ children }) => {
    const [selectedParentId, setSelectedParentId] = useState();

    return (
        <Provider
            value={{
                selectedParentId,
                setSelectedParentId
            }}
        >
            {children}
        </Provider>
    );
}

export default BudgetProvider;

