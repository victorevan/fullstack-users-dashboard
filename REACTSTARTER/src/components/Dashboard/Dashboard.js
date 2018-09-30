import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handlePaginationData } from '../../actions/paginatedUsers';

import View from './View';

class Dashboard extends Component {
  state = {
    isCustomSearching: false,
    search: '',
    currentFilter: 'name',
  };

  componentDidMount() {
    const { loadPaginatedData } = this.props;
    loadPaginatedData();
  }

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({ search: value }, () => {
      const { loadPaginatedData } = this.props;
      const { search, currentFilter, isCustomSearching } = this.state;
      const trimmedSearch = search.trim();
      if (trimmedSearch.length >= 3) {
        this.setState({ isCustomSearching: true }, () => {
          loadPaginatedData({
            filter: currentFilter,
            filterVal: trimmedSearch,
          });
        });
      } else if (isCustomSearching && trimmedSearch.length < 3) {
        this.setState({ isCustomSearching: false }, () => {
          loadPaginatedData();
        });
      }
    });
  }

  handleFilterChange = (e, { value }) => this.setState({ search: '', currentFilter: value });

  handlePaginationChange = (e, { activePage }) => {
    const { loadPaginatedData } = this.props;
    loadPaginatedData({ page: activePage });
  }

  render() {
    return (
      <View
        {...this.props}
        {...this.state}
        changeSearch={this.handleSearch}
        changeFilter={this.handleFilterChange}
        changePage={this.handlePaginationChange}
      />
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
    docs, total, /* limit, */ page, pages,
  } = paginatedUsers;
  const {
    entities, result,
  } = docs;
  const users = result.map(id => entities.users[id]);
  return {
    loading: false,
    users,
    total,
    // limit,
    page,
    pages,
  };
};

const mapDispatchToProps = dispatch => ({
  loadPaginatedData: queries => dispatch(handlePaginationData(queries)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
