import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useHistory } from 'react-router-dom';

import { addTransaction } from 'data/actions/budget.actions';

import { Grid } from './Budget.css';
import { Modal, Button, SuspenseErrorBoundary } from 'components';

import BudgetCategoryList from 'pages/Budget/components/BudgetCategoryList';
import BudgetTransactionList from 'pages/Budget/components/BudgetTransactionList';

import AddTransactionForm from './components/AddTransactionForm/AddTransactionForm';
import SingleTransactionData from './components/SingleTransactionData/SingleTransactionData';

const Budget = ({ allCategories, budget, addTransaction }) => {

  const history = useHistory();

  const { t } = useTranslation();

  const handleSubmitAddTransaction = values => {
    addTransaction({
      budgetId: budget.id,
      data: values,
      translation: t,
    })
      .then(() => history.goBack());
  };


  return (
    <>
      <Grid>
        <section>
          <SuspenseErrorBoundary>
            <BudgetCategoryList />
          </SuspenseErrorBoundary>
        </section>
        <section>
          <SuspenseErrorBoundary>
            <Button to='/budget/transactions/new'>{t('Add new transaction')}</Button>
            <BudgetTransactionList />
          </SuspenseErrorBoundary>
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
            <SingleTransactionData />
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
  addTransaction,
})(Budget);



