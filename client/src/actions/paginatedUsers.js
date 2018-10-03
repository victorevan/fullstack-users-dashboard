import { showLoading, hideLoading } from 'react-redux-loading';
import { normalize } from 'normalizr';
import usersSchema from './usersSchema';
import { getPaginationData } from '../utils/api';

export const RECEIVE_PAGINATED_DATA = 'RECEIVE_PAGINATED_USERS';

// synchronous action creator
function receivePaginationData(paginationData) {
  // eslint-disable-next-line no-param-reassign
  paginationData.docs = normalize(paginationData.docs, usersSchema);
  return {
    type: RECEIVE_PAGINATED_DATA,
    paginationData,
  };
}

// asynchronous action creator
export function handlePaginationData(queries) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const paginationData = await getPaginationData(queries);
      dispatch(receivePaginationData(paginationData));
      dispatch(hideLoading());
    } catch (err) {
      // error handling would be done here
      dispatch(hideLoading());
    }
  };
}
