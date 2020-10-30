import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'index.css';
import { LoadingIndicator, Navigation, Wrapper } from 'components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react';

import theme from 'utils/theme';



function App() {
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
              <button onClick={() => i18n.changeLanguage('pl')}>pl</button>
              <button onClick={() => i18n.changeLanguage('en')}>en</button>
            </div>
          )}
        />

        <Wrapper>
          <Switch>
            <Route path="/" exact>
              {t('This is home page')}
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


const RootApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <App />
      </React.Suspense>
    </ThemeProvider>
  )
}


export default RootApp;
