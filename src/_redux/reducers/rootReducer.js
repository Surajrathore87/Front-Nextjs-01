import { combineReducers } from 'redux';
import userData from './index';
import taxiService from './taxiServiceReducer';

export default combineReducers({
  user: userData,
  taxi: taxiService,

});
