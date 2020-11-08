import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useHistory } from 'react-router-dom';

import { addTransaction } from 'data/actions/budget.actions';

import { Grid } from './Budget.css';
import { Modal, Button, LoadingIndicator } from 'components';

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
          <React.Suspense fallback={<LoadingIndicator />}>
            <BudgetCategoryList />
          </React.Suspense>
        </section>
        <section>
          <React.Suspense fallback={<LoadingIndicator />}>
            <Button to='/budget/transactions/new'>{t('Add new transaction')}</Button>
            <BudgetTransactionList />
          </React.Suspense>
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



