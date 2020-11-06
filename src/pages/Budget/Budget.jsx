import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';

import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.actions';
import { fetchAllCategories } from 'data/actions/common.actions';

import { Grid } from './Budget.css';
import { LoadingIndicator, Modal, Button } from 'components';

import BudgetCategoryList from 'pages/Budget/components/BudgetCategoryList';
import BudgetTransactionList from 'pages/Budget/components/BudgetTransactionList';

const Budget = ({
    budgetState, commonState,
    fetchBudget, fetchBudgetedCategories, fetchAllCategories
}) => {

    useEffect(() => {
        fetchBudget(1);
        fetchBudgetedCategories(1);
        fetchAllCategories();

        return () => {
            console.log('Odmontowano komponent Budget');
        }
    }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories]);

    const { t } = useTranslation();

    const isLoaded = useMemo(
        () => !!commonState && !!budgetState && Object.keys(commonState).length === 0 && Object.keys(budgetState).length === 0,
        [commonState, budgetState]
    );

    return (
        <>
            <Grid>
                <section>
                    {isLoaded ?
                        <>
                            <Button to='/budget/transactions/new'>{t('Add new transaction')}</Button>
                            <BudgetCategoryList />
                        </>
                        : <LoadingIndicator />}
                </section>
                <section>
                    {isLoaded ? <BudgetTransactionList /> : <LoadingIndicator />}
                </section>
            </Grid>

            <Switch>
                <Route exact path="/budget/transactions/new">
                    <Modal>Modal content</Modal>
                </Route>
            </Switch>
        </>
    );
}


export default connect(state => {
    return {
        budget: state.budget.budget,
        commonState: state.common.loadingState,
        budgetState: state.budget.loadingState,
    }
}, {
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories
})(Budget);



