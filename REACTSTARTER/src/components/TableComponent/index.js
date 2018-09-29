import _ from 'lodash';
import React, { Component } from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react';

const tableData = [
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

export default class TableComponent extends Component {
  state = {
    column: null,
    data: tableData,
    direction: null,
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  }

  render() {
    const tableHeaderKeys = [
      '_id', 'name', 'role', 'location', 'type', 'surveyStatus', 'selected',
    ];
    const { column, data, direction } = this.state;

    return (
      <Table sortable celled>
        <Table.Header>
          <Table.Row>
            {tableHeaderKeys.map(headerKey => (
              <Table.HeaderCell
                key={headerKey}
                sorted={column === headerKey ? direction : null}
                onClick={this.handleSort(headerKey)}
              >
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
          <Table.Row>
            <Table.HeaderCell colSpan={tableHeaderKeys.length}>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}
