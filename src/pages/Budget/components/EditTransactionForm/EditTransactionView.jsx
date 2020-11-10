import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import EditTransactionForm from './EditTransactionForm';

import API from 'data/fetch';
import queryCache from 'data/query/queryCache';

const EditTransactionView = () => {
    const { id } = useParams();

    const { data: budget } = useQuery(['budget', { id: 1 }], API.budget.fetchBudget);
    const { data: allCategories } = useQuery(['allCategories'], API.common.fetchAllCategories);

    const [mutate] = useMutation(API.budget.editTransaction, {
        onSuccess: () => {
            queryCache.invalidateQueries(['budget', { id: 1 }]);
            toast.success(t('Transaction has been updated!'), {
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


    const handleSubmitEditTransaction = values => {
        values.id = id;
        values.budgetId = budget.id;

        mutate({
            transactionId: id,
            data: values,
        })
            .then(() => history.push("/budget"));
    };


    return (
        <EditTransactionForm onSubmit={handleSubmitEditTransaction} categories={allCategories} transactions={budget.transactions} groupCategoriesBy={'parentCategory.name'} />
    );
}

export default EditTransactionView;