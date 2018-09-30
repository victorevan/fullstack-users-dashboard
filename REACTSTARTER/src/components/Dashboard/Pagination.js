import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as SUIPagination } from 'semantic-ui-react';

const Pagination = ({
  changePage, page, pages, total,
}) => (
  <SUIPagination
    onPageChange={changePage}
    firstItem={false}
    lastItem={false}
    prevItem={page !== 1 ? undefined : null}
    nextItem={page !== total ? undefined : null}
    boundaryRange={1}
    siblingRange={1}
    activePage={page}
    totalPages={pages}
  />
);

Pagination.propTypes = {
  changePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default Pagination;
