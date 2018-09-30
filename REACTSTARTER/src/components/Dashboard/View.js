import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SearchInput from './SearchInput';
import Table from './Table';
import Pagination from './Pagination';

const Dashboard = styled.div`

`;

const View = ({
  changeSearch, changeFilter, changePage, loading, search, currentFilter, users, page, pages, total,
}) => (
  <Fragment>
    {loading
      ? <div>loading</div>
      : (
        <Dashboard>
          <SearchInput
            search={search}
            currentFilter={currentFilter}
            changeSearch={changeSearch}
            changeFilter={changeFilter}
          />
          <Table
            users={users}
          />
          <Pagination
            page={page}
            pages={pages}
            total={total}
            changePage={changePage}
          />
        </Dashboard>
      )
    }
  </Fragment>
);

View.defaultProps = {
  page: 1,
  pages: 1,
};

View.propTypes = {
  loading: PropTypes.bool.isRequired,
  search: PropTypes.string.isRequired,
  currentFilter: PropTypes.string.isRequired,
  changeSearch: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    location: PropTypes.string,
    type: PropTypes.string,
    selected: PropTypes.bool,
    surveyStatus: PropTypes.string,
  })),
  total: PropTypes.number.isRequired,
  // limit: PropTypes.number.isRequired,
  page: PropTypes.number,
  pages: PropTypes.number,
};

export default View;
