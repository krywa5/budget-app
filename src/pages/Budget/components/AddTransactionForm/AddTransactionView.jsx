import React from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import AddTransactionForm from './AddTransactionForm';

import API from 'data/fetch';
import { addTransaction } from 'data/actions/budget.actions';

const AddTransactionView = ({ addTransaction }) => {
    const { data: budget } = useQuery(['budget', { id: 1 }], API.budget.fetchBudget);
    const { data: allCategories } = useQuery(['allCategories'], API.common.fetchAllCategories);

    const history = useHistory();

    const { t } = useTranslation();

    const handleSubmitAddTransaction = values => {
        addTransaction({
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

export default connect(null, {
    addTransaction
})(AddTransactionView);