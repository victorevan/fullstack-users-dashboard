import React from 'react';
import PropTypes from 'prop-types';
import { Table as SUITable } from 'semantic-ui-react';

import to from 'to-case';

const Table = ({
  users,
}) => (
  <SUITable unstackable sortable celled>
    <SUITable.Header>
      <SUITable.Row>
        <SUITable.HeaderCell>ID</SUITable.HeaderCell>
        <SUITable.HeaderCell>Name</SUITable.HeaderCell>
        {['role', 'location', 'type', 'surveyStatus']
          .map(title => (
            <SUITable.HeaderCell key={title}>
              {to.title(title)}
            </SUITable.HeaderCell>
          ))}
      </SUITable.Row>
    </SUITable.Header>
    <SUITable.Body>
      {users.map(({
        _id: id, name, role, location, type, surveyStatus,
      }) => (
        <SUITable.Row key={id}>
          <SUITable.Cell>{id}</SUITable.Cell>
          <SUITable.Cell>{name}</SUITable.Cell>
          <SUITable.Cell>{role}</SUITable.Cell>
          <SUITable.Cell>{location}</SUITable.Cell>
          <SUITable.Cell>{type}</SUITable.Cell>
          <SUITable.Cell>{surveyStatus}</SUITable.Cell>
        </SUITable.Row>
      ))}
    </SUITable.Body>
  </SUITable>
);

Table.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Table;
