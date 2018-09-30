import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as SUIPagination } from 'semantic-ui-react';

const Pagination = ({
  page, pages,
}) => (
  <SUIPagination
    boundaryRange={2}
    siblingRange={2}
    activePage={page}
    totalPages={pages}
  />
);

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
};

export default Pagination;
