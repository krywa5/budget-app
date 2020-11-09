import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import AddTransactionForm from './AddTransactionForm';

import API from 'data/fetch';
import queryCache from 'data/query/queryCache';

const AddTransactionView = () => {
    const { data: budget } = useQuery(['budget', { id: 1 }], API.budget.fetchBudget);
    const { data: allCategories } = useQuery(['allCategories'], API.common.fetchAllCategories);

    const [mutate] = useMutation(API.budget.addTransaction, {
        onSuccess: () => {
            queryCache.invalidateQueries(['budget', { id: 1 }]);
        },
    });

    const history = useHistory();
    const { t } = useTranslation();


    const handleSubmitAddTransaction = values => {
        mutate({
            budgetId: budget.id,
            data: values,
            translation: t,
        })
            .then(() => history.push("/budget"));
    };


    return (
        <AddTransactionForm onSubmit={handleSubmitAddTransaction} categories={allCategories} groupCategoriesBy={'parentCategory.name'} />
    );
}

export default AddTransactionView;