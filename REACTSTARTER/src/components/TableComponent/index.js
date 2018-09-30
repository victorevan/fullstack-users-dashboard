import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination, Menu, Icon } from 'semantic-ui-react';

const data = [
  {
    _id: '5baec89bf9d88f43d805e40b',
    name: 'Victor',
    role: 'Software Engineer',
    location: 'San Francisco, CA',
    type: 'Employee',
    surveyStatus: 'Completed',
    selected: false,
  },
  {
    _id: '5baec89bf9d88f43d805e40c',
    name: 'Jose',
    role: 'Graphic Designer',
    location: 'Las Vegas, NV',
    type: 'Candidate',
    surveyStatus: 'Scheduled',
    selected: true,
  },
];

class TableComponent extends Component {

  render() {
    const tableHeaderKeys = [
      'Role', 'Location', 'Type', 'Survey Status', 'Selected',
    ];

    return (
      <Table sortable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
            {tableHeaderKeys.map(headerKey => (
              <Table.HeaderCell key={headerKey}>
                {headerKey}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, ({
            _id, name, role, location, type, surveyStatus, selected,
          }) => (
            <Table.Row key={name}>
              <Table.Cell>{_id}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{role}</Table.Cell>
              <Table.Cell>{location}</Table.Cell>
              <Table.Cell>{type}</Table.Cell>
              <Table.Cell>{surveyStatus}</Table.Cell>
              <Table.Cell>{selected ? 'selected' : 'not selected'}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          {/* <Pagination /> */}
        </Table.Footer>
      </Table>
    );
  }
}

export default TableComponent;
