import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useHistory } from 'react-router-dom';

import { fetchBudget, fetchBudgetedCategories, addTransaction } from 'data/actions/budget.actions';
import { fetchAllCategories } from 'data/actions/common.actions';

import { Grid } from './Budget.css';
import { LoadingIndicator, Modal, Button } from 'components';

import BudgetCategoryList from 'pages/Budget/components/BudgetCategoryList';
import BudgetTransactionList from 'pages/Budget/components/BudgetTransactionList';

import AddTransactionForm from './components/AddTransactionForm/AddTransactionForm';
import SingleTransactionData from './components/SingleTransactionData/SingleTransactionData';

const Budget = ({
  budgetState, commonState, allCategories, budget, addTransaction,
  fetchBudget, fetchBudgetedCategories, fetchAllCategories
}) => {

  const history = useHistory();

  useEffect(() => {
    fetchBudget(1);
    fetchBudgetedCategories(1);
    fetchAllCategories();

    return () => {
      // console.log('Odmontowano komponent Budget');
    }
  }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories]);

  const { t } = useTranslation();

  const isLoaded = useMemo(
    () => !!commonState && !!budgetState && Object.keys(commonState).length === 0 && Object.keys(budgetState).length === 0,
    [commonState, budgetState]
  );

  const handleSubmitAddTransaction = values => {
    addTransaction({
      budgetId: budget.id,
      data: values,
    })
      .then(() => history.goBack());
  };

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
          <Modal>
            <AddTransactionForm onSubmit={handleSubmitAddTransaction} categories={allCategories} groupCategoriesBy={'parentCategory.name'} />
          </Modal>
        </Route>

        <Route exact path="/budget/transaction/:id">
          <Modal>
            {isLoaded ? <SingleTransactionData transactions={budget.transactions} budgetName={budget.name} allCategories={allCategories} /> : <LoadingIndicator />}
          </Modal>
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
    allCategories: state.common.allCategories,
  }
}, {
  fetchBudget,
  fetchBudgetedCategories,
  fetchAllCategories,
  addTransaction,
})(Budget);



