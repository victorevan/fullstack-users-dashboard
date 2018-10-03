import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import { connectRouter } from 'connected-react-router';
import { history } from '../middleware/index';
import paginatedUsers from './paginatedUsers';

const rootReducer = combineReducers({
  paginatedUsers,
  loadingBar: loadingBarReducer,
});

export default connectRouter(history)(rootReducer);
