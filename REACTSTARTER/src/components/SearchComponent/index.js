import React from 'react';
import { Button, Select, Input } from 'semantic-ui-react';

const options = [
  { key: 'name', text: 'Name', value: 'name' },
  { key: 'role', text: 'Role', value: 'role' },
  { key: 'location', text: 'Location', value: 'location' },
];

const SearchComponent = () => (
  <Input type="text" placeholder="Search by..." action>
    <input />
    <Select compact options={options} defaultValue="name" />
    <Button type="submit">Search</Button>
  </Input>
);

export default SearchComponent;
