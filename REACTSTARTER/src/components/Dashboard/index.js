import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handlePaginationData } from '../../actions/paginatedUsers';

import View from './View';

class Dashboard extends Component {
  state = {
    search: '',
  };

  componentDidMount() {
    const { loadPaginatedData } = this.props;
    loadPaginatedData();
  }

  handleNewQuery = () => {
    console.log('adsgasef');
  }

  render() {
    return (
      <View {...this.props} {...this.state} />
    );
  }
}

// mapping normalized data to state as best practice
const mapStateToProps = ({ paginatedUsers }) => {
  if (!paginatedUsers.docs) {
    return {
      loading: true,
    };
  }
  const {
    docs, total, limit, page, pages,
  } = paginatedUsers;
  const {
    entities, result,
  } = docs;
  const users = Object.keys(result)
    .map(id => entities[id]);
  return {
    loading: false,
    users,
    total,
    limit,
    page,
    pages,
  };
};

const mapDispatchToProps = dispatch => ({
  loadPaginatedData: queries => dispatch(handlePaginationData(queries)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
