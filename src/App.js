import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'index.css';
import { Navigation } from 'components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import theme from 'utils/theme';



function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Navigation items={[
          {
            content: 'Homepage',
            to: '/',
          },
          {
            content: 'Budget',
            to: '/budget',
          },
        ]} />

        <Switch>
          <Route path="/" exact>
            Home Page
          </Route>
          <Route path="/budget">
            Budget Page
          </Route>
        </Switch>
      </Router>

    </ThemeProvider>
  );
}

export default App;
