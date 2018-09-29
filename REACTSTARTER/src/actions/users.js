import { showLoading, hideLoading } from 'react-redux-loading';
import { saveUser } from '../utils/api';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER = 'ADD_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function handleAddUser(user) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const savedUser = await saveUser(user);
      dispatch(addUser(savedUser));
      dispatch(hideLoading());
    } catch (err) {
      // error handling would be done here
      dispatch(hideLoading());
    }
  };
}
