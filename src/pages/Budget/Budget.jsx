import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';

import { Grid } from './Budget.css';
import { Modal, Button, SuspenseErrorBoundary } from 'components';

import BudgetCategoryList from 'pages/Budget/components/BudgetCategoryList';
import BudgetTransactionList from 'pages/Budget/components/BudgetTransactionList';

import SingleTransactionData from './components/SingleTransactionData/SingleTransactionData';
import AddTransactionView from './components/AddTransactionForm/AddTransactionView';

const Budget = () => {

  const { t } = useTranslation();

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
            <AddTransactionView />
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


export default Budget;