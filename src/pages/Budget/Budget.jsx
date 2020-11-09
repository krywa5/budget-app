import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';

import { Grid } from './Budget.css';
import { Modal, Button, SuspenseErrorBoundary } from 'components';
import BudgetProvider from 'data/context/budget.context';

const BudgetTransactionList = React.lazy(() => import('pages/Budget/components/BudgetTransactionList'));
const BudgetCategoryList = React.lazy(() => import('pages/Budget/components/BudgetCategoryList'));
const AddTransactionView = React.lazy(() => import('./components/AddTransactionForm/AddTransactionView'));
const SingleTransactionData = React.lazy(() => import('./components/SingleTransactionData/SingleTransactionData'));

const Budget = () => {
  const [showTransactions, setShowTransactions] = useState(false);



  const { t } = useTranslation();

  return (
    <BudgetProvider>
      <Grid>
        <section>
          <SuspenseErrorBoundary>
            <BudgetCategoryList />
          </SuspenseErrorBoundary>
        </section>
        <section>
          <SuspenseErrorBoundary>
            <Button to='/budget/transactions/new'>{t('Add new transaction')}</Button>
            <Button onClick={() => setShowTransactions(!showTransactions)}>
              {showTransactions ? t('Hide transactions') : t('Show transactions')}
            </Button>
            {showTransactions && (
              <BudgetTransactionList />
            )}
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
    </BudgetProvider>
  );
}


export default Budget;