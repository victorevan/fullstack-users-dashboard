import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { getUser, editUser, deleteUser } from '../../utils/api';

import View from './View';

class User extends Component {
  state = {
    loading: true,
    user: null,
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const user = await getUser(id);
    this.setState({ loading: false, user });
  }

  handleUpdateUser = async (update) => {
    const { user } = this.state;
    const { _id: id } = user;

    const status = await editUser(id, update);
    
    // error handler of sorts
    if (status.nModified === 0) {
      const newUser = await getUser(id);
      // eslint-disable-next-line
      window.alert('Something went wrong. Please try again.');
      this.setState({ user: newUser });
    }
  }

  handleDeleteUser = async (id) => {
    const deletedUser = await deleteUser(id);
    if (deletedUser._id === id) {
      const { redirectTo } = this.props;
      window.alert('User successfully deleted!');
      redirectTo('/');
    } else {
      window.alert('Something went wrong. Please try again.');
    }
  }

  render() {
    return (
      <View
        {...this.props}
        {...this.state}
        updateUser={this.handleUpdateUser}
        deleteUser={this.handleDeleteUser}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  redirectTo: path => dispatch(push(path)),
});

export default connect(() => ({}), mapDispatchToProps)(User);
