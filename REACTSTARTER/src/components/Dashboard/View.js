import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SearchInput from './SearchInput';
import Table from './Table';
import Pagination from './Pagination';

const Dashboard = styled.div`

`;

const View = ({
  page, pages,
}) => (
  <Dashboard>
    <SearchInput />
    <Table />
    <Pagination
      page={page}
      pages={pages}
    />
  </Dashboard>
);

View.propTypes = {
  loading: PropTypes.bool.isRequired,
  search: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    surveyStatus: PropTypes.string.isRequired,
  })),
  total: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
};

export default View;
