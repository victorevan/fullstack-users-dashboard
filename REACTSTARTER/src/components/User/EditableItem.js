import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'semantic-ui-react';

import to from 'to-case';

import { UserList } from './styled';

export default class EditableItem extends Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    propName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }

  state = {
    isEditing: false,
    value: this.props.value,
    editedValue: this.props.value,
  }

  componentDidUpdate(prevProps) {
    const { value: prevVal } = prevProps;
    const { value: nextVal } = this.props;
    if (prevVal !== nextVal) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ value: nextVal });
    }
  }

  handleEditState = () => {
    const { isEditing } = this.state;
    if (isEditing) {
      const { value: prevVal } = this.props;
      const { editedValue: nextVal } = this.state;
      this.setState({ isEditing: false }, () => {
        this.optimisticallyUpdate(prevVal, nextVal);
      });
    } else {
      this.setState({ isEditing: true });
    }
  }

  handleEditValueChange = ({ target }) => {
    this.setState({ editedValue: target.value });
  }

  optimisticallyUpdate = (prevVal, nextVal) => {
    const { propName } = this.props;
    if (prevVal !== nextVal) {
      this.setState({ value: nextVal }, () => {
        const { updateUser } = this.props;
        updateUser({ [propName]: nextVal });
      });
    }
  }

  render() {
    const { propName } = this.props;
    const { isEditing, editedValue, value } = this.state;

    return (
      <UserList.Item>
        <UserList.Content>
          <UserList.Content.Wrapper>
            <UserList.Header>{to.title(propName)}</UserList.Header>
          </UserList.Content.Wrapper>
          <UserList.Content.Wrapper>
            {isEditing
              ? (
                <Input>
                  <input
                    value={editedValue}
                    onChange={this.handleEditValueChange}
                  />
                </Input>
              )
              : <UserList.Description>{value}</UserList.Description>
            }
          </UserList.Content.Wrapper>
          <UserList.Content.Wrapper>
            <Button
              icon="edit"
              onClick={this.handleEditState}
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </UserList.Content.Wrapper>
        </UserList.Content>
      </UserList.Item>
    );
  }
}
