import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as SUIPagination } from 'semantic-ui-react';
import styled from 'styled-components';

const CenteredPagination = styled(SUIPagination)`
  display: flex;
  justify-content: center;
`;

const Pagination = ({
  changePage, page, pages, total, limit
}) => (
  <CenteredPagination
    onPageChange={changePage}
    firstItem={false}
    lastItem={false}
    prevItem={page !== 1 ? undefined : null}
    nextItem={page !== (total / limit) ? undefined : null}
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
  limit: PropTypes.number.isRequired,
};

export default Pagination;
