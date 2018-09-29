import { RECEIVE_USERS, ADD_USER } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    // TODO
/*     case ADD_USER:
      return {
        ...state,
      }; */
    default:
      return state;
  }
}
