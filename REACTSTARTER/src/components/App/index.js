import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

import handleInitialData from '../../actions/shared';

import Home from '../Home';

class App extends Component {
  static propTypes = {
    loadInitialData: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { loadInitialData } = this.props;
    loadInitialData();
  }

  render() {
    return (
      <Container>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadInitialData: () => dispatch(handleInitialData()),
});

export default connect(() => ({}), mapDispatchToProps)(App);
