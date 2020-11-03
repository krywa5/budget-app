import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'index.css';
import { Button, LoadingIndicator, Navigation, Wrapper } from 'components';
import { Home } from 'pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.actions';

import theme from 'utils/theme';



function App({ budget, fetchBudget, fetchBudgetedCategories }) {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetedCategories(1);

    return () => {
      console.log('test');
    }
  }, [fetchBudget, fetchBudgetedCategories]);


  const { t, i18n } = useTranslation();

  return (
    <>
      <GlobalStyle />
      <Router>
        <Navigation
          items={[
            {
              content: 'Homepage',
              to: '/',
            },
            {
              content: 'Budget',
              to: '/budget',
            },
          ]}
          RightElement={(
            <div>
              <Button variant="regular" onClick={() => i18n.changeLanguage('pl')}>pl</Button>
              <Button variant="regular" onClick={() => i18n.changeLanguage('en')}>en</Button>
            </div>
          )}
        />

        <Wrapper>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/budget">
              {t('This is budget page')}
            </Route>
          </Switch>
        </Wrapper>

      </Router>
    </>
  );
}


const ConnectedApp = connect(state => {
  return {
    budget: state.budget.budget
  }
}, {
  fetchBudget,
  fetchBudgetedCategories
})(App);


const RootApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <ConnectedApp />
      </React.Suspense>
    </ThemeProvider>
  )
}


export default RootApp;
