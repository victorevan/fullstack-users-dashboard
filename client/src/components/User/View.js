import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { UserCard, UserList } from './styled';

import EditableItem from './EditableItem';

/* eslint-disable */

const View = ({
  loading, user, propNames, updateUser, deleteUser,
}) => (
  <Fragment>
    {loading
      ? <div>loading</div>
      : (
        <UserCard fluid>
          <UserCard.Content>
            <UserCard.Header>User Info</UserCard.Header>
            <UserCard.Meta>{user._id}</UserCard.Meta>
            <UserList>
              {propNames.map(propName => (
                <EditableItem
                  propName={propName}
                  value={user[propName]}
                  updateUser={updateUser}
                />
              ))}
            </UserList>
          </UserCard.Content>
          <UserCard.Content extra center>
            <Button onClick={() => deleteUser(user._id)}>Delete User</Button>
          </UserCard.Content>
        </UserCard>
      )
    }
  </Fragment>
);

/* eslint-enable */

View.defaultProps = {
  propNames: ['name', 'role', 'location', 'type', 'surveyStatus'],
};

View.propTypes = {
  propNames: PropTypes.arrayOf(PropTypes.string),
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    location: PropTypes.string,
    type: PropTypes.string,
    selected: PropTypes.bool,
    surveyStatus: PropTypes.string,
  }).isRequired,
};

export default View;
