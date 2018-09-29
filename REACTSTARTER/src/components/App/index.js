import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import handleInitialData from '../../actions/shared';

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
      <div className="app">
        Once you add some code here I am sure this will look a heck of a lot better.
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadInitialData: () => dispatch(handleInitialData()),
});

export default connect(() => ({}), mapDispatchToProps)(App);
