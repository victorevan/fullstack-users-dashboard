import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'semantic-ui-react';

const SearchInput = ({
  search, options,
}) => (
  <Input type="text" placeholder="Search by..." action>
    <input value={search} />
    <Select compact options={options} defaultValue="name" />
  </Input>
);

SearchInput.propTypes = {
  search: PropTypes.string.isRequired,
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