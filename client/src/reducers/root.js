import { combineReducers } from 'redux';
//import alert from './alert';
import auth from './auth';
import user from './user';
import channel from './channel';

export default combineReducers({
  auth,
  user,
  channel
});
