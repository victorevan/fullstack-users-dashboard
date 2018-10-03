import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// renamed so as to not conflict with exported Table
import { Table as SUITable } from 'semantic-ui-react';
import styled from 'styled-components';

import _ from 'lodash';
import to from 'to-case';

const MobileFriendlyTable = styled(SUITable)`
  /* inspired by https://css-tricks.com/responsive-data-tables/ */

  @media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px)  {

    /* Force table to not be like tables anymore */
    table, thead, tbody, th, td, tr { 
      display: block; 
    }
    
    /* Hide table headers (but not display: none;, for accessibility) */
    thead tr { 
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    
    tr { border: 1px solid #ccc; }
    
    td { 
      /* Behave  like a "row" */
      display: flex;
      justify-content: space-between;
      border: none;
      border-bottom: 1px solid #eee; 
      position: relative;
      padding-left: 50%; 
    }

    td.mobile-center {
      justify-content: center;
    }

    td:before { 
      /* Now like a table header */
      width: 45%; 
      padding-right: 10px; 
      white-space: nowrap;
    }
    
    /*
    Label the data
    */
    ${({ cellHeaderTitles }) => cellHeaderTitles.map((title, i) => `
      td:nth-of-type(${i + 1}):before {
        content: "${to.title(title)}";
        font-weight: bold;
      }
    `)}
  }
`;

class Table extends Component {
  state = {
    column: null,
    data: this.props.users,
    direction: null,
  }

  componentDidUpdate(prevProps) {
    const { users: prevUsers } = prevProps;
    const { users: nextUsers } = this.props;
    // more performant than deep equality checking
    if (JSON.stringify(prevUsers) !== JSON.stringify(nextUsers)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        column: null,
        data: nextUsers,
        direction: null,
      });
    }
  }

  // from https://react.semantic-ui.com/collections/table/#variations-sortable
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
    const { cellHeaderTitles } = this.props;
    const { data, column, direction } = this.state;

    return (
      <MobileFriendlyTable cellHeaderTitles={cellHeaderTitles} unstackable sortable celled>
        <SUITable.Header>
          <SUITable.Row>
            {cellHeaderTitles.map(title => (
              <SUITable.HeaderCell
                key={title}
                sorted={column === title ? direction : null}
                onClick={this.handleSort(title)}
              >
                {to.title(title)}
              </SUITable.HeaderCell>
            ))}
            <SUITable.HeaderCell>
              Action
            </SUITable.HeaderCell>
          </SUITable.Row>
        </SUITable.Header>
        <SUITable.Body>
          {data.map(({
            _id: id, name, role, location, type, surveyStatus,
          }) => (
            <SUITable.Row key={id}>
              <SUITable.Cell>{id}</SUITable.Cell>
              <SUITable.Cell>{name}</SUITable.Cell>
              <SUITable.Cell>{role}</SUITable.Cell>
              <SUITable.Cell>{location}</SUITable.Cell>
              <SUITable.Cell>{type}</SUITable.Cell>
              <SUITable.Cell>{surveyStatus}</SUITable.Cell>
              <SUITable.Cell className="mobile-center">
                <Link to={`/user/${id}`}>
                  Open
                </Link>
              </SUITable.Cell>
            </SUITable.Row>
          ))}
        </SUITable.Body>
      </MobileFriendlyTable>
    );
  }
};

Table.defaultProps = {
  cellHeaderTitles: ['_id', 'name', 'role', 'location', 'type', 'surveyStatus'],
};

Table.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  cellHeaderTitles: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default Table;
