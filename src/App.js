import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'index.css';
import { Button, LoadingIndicator, Navigation, Wrapper } from 'components';
import { Home, Budget } from 'pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import theme from 'utils/theme';
import queryCache from 'data/query/queryCache';

toast.configure();

function App({ budget, fetchBudget, fetchBudgetedCategories }) {

  const { i18n } = useTranslation();

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
              <Budget />
            </Route>
          </Switch>
        </Wrapper>

      </Router>
    </>
  );
}


const RootApp = () => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ThemeProvider theme={theme}>
        <React.Suspense fallback={<LoadingIndicator />}>
          <App />
        </React.Suspense>
      </ThemeProvider>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </ReactQueryCacheProvider>
  )
}


export default RootApp;
