import React from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';

import Dashboard from '../Dashboard';

const App = () => (
  <Container>
    <LoadingBar />
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route render={() => <h1>Not Found</h1>} />
    </Switch>
  </Container>
);

export default App;
