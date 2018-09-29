import React from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home';

const App = () => (
  <Container>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route render={() => <h1>Not Found</h1>} />
    </Switch>
  </Container>
);

export default App;
