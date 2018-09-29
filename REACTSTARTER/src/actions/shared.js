import { showLoading, hideLoading } from 'react-redux-loading';
import { normalize } from 'normalizr';
import { filterDuplicatesBy } from '../utils/helpers';
import allUsersSchema from './allUsersSchema';
import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';

// normalized data example - not used for the sake of reducing complexity
export default () => async (dispatch) => {
  dispatch(showLoading);
  const users = await getInitialData();
  const filteredUsers = filterDuplicatesBy(users, 'name');
  dispatch(receiveUsers(normalize(filteredUsers, allUsersSchema)));
  dispatch(hideLoading());
};
