import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import { connectRouter } from 'connected-react-router';
import { history } from '../middleware/index';
import userData from './users';

const rootReducer = combineReducers({
  userData,
  loadingBar: loadingBarReducer,
});

export default connectRouter(history)(rootReducer);
