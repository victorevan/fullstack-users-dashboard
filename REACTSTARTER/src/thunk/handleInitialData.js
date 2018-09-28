import { showLoading, hideLoading } from 'react-redux-loading';
import { normalize } from 'normalizr';
import usersSchema from '../actions/usersSchema';
import { getInitialData } from '../utils/api';
import { receiveUsers } from '../actions/users';

export default () => async (dispatch) => {
  dispatch(showLoading);
  const users = await getInitialData();
  dispatch(receiveUsers(normalize(users, usersSchema)));
  dispatch(hideLoading());
};
