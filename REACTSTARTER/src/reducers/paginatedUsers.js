import { RECEIVE_PAGINATED_DATA } from '../actions/paginatedUsers';

export default function paginatedUsers(state = {}, action) {
  switch (action.type) {
    case RECEIVE_PAGINATED_DATA:
      return {
        ...state,
        ...action.paginationData,
      };
    default:
      return state;
  }
}
