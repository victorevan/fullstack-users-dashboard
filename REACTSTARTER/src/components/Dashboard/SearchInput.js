import React from 'react';
import PropTypes from 'prop-types';
import { Input, Dropdown } from 'semantic-ui-react';

const SearchInput = ({
  changeSearch, changeFilter, search, options, currentFilter,
}) => (
  <Input type="text" placeholder="Search by..." action>
    <input
      value={search}
      onChange={changeSearch}
    />
    <Dropdown
      selection
      options={options}
      value={currentFilter}
      onChange={changeFilter}
    />
  </Input>
);

SearchInput.propTypes = {
  search: PropTypes.string.isRequired,
  currentFilter: PropTypes.string.isRequired,
  changeSearch: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

SearchInput.defaultProps = {
  options: [
    { key: 'name', text: 'Name', value: 'name' },
    { key: 'role', text: 'Role', value: 'role' },
    { key: 'location', text: 'Location', value: 'location' },
  ],
};

export default SearchInput;