import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import AddTransactionForm from './AddTransactionForm';

import API from 'data/fetch';
import queryCache from 'data/query/queryCache';

const AddTransactionView = () => {
    const { data: budget } = useQuery(['budget', { id: 1 }], API.budget.fetchBudget);
    const { data: allCategories } = useQuery(['allCategories'], API.common.fetchAllCategories);

    const [mutate] = useMutation(API.budget.addTransaction, {
        onSuccess: () => {
            queryCache.invalidateQueries(['budget', { id: 1 }]);
            toast.success(t('Transaction has been added!'), {
                position: toast.POSITION.TOP_RIGHT,
            });
        },
        onError: () => {
            toast.error(t('Something went wrong.'), {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    });

    const history = useHistory();
    const { t } = useTranslation();


    const handleSubmitAddTransaction = values => {
        mutate({
            budgetId: budget.id,
            data: values,
        })
            .then(() => history.push("/budget"));
    };


    return (
        <AddTransactionForm onSubmit={handleSubmitAddTransaction} categories={allCategories} groupCategoriesBy={'parentCategory.name'} />
    );
}

export default AddTransactionView;