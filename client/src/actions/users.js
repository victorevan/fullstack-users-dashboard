// unused action creators for getting ALL USERS from API

import { showLoading, hideLoading } from 'react-redux-loading';
import { normalize } from 'normalizr';
import { filterDuplicatesBy } from '../utils/helpers';
import usersSchema from './usersSchema';
import { getAllUserData } from '../utils/api';

export const RECEIVE_USERS = 'RECEIVE_USERS';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users: normalize(users, usersSchema),
  };
}

export function handleUsers() {
  return async (dispatch) => {
    dispatch(showLoading);
    const users = await getAllUserData();
    const filteredUsers = filterDuplicatesBy(users, 'name');
    dispatch(receiveUsers(filteredUsers));
    dispatch(hideLoading());
  };
}
