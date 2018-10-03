import React from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';

import Navbar from '../Navbar';
import Dashboard from '../Dashboard';
import User from '../User';
import AddUser from '../AddUser';

const App = () => (
  <Container>
    <LoadingBar />
    <Navbar />
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/user/:id" component={User} />
      <Route path="/add" component={AddUser} />
      <Route render={() => <h1>Not Found</h1>} />
    </Switch>
  </Container>
);

export default App;
