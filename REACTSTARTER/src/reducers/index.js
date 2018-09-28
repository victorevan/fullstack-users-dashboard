import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import { connectRouter } from 'connected-react-router';
import { history } from '../middleware/index';
import users from './users';

const rootReducer = combineReducers({
  users,
  loadingBar: loadingBarReducer,
});

export default connectRouter(history)(rootReducer);