import { combineReducers } from 'redux';

import connection from './connection';
import telemetry from './telemetry';



export default combineReducers({
  connection,
  telemetry
});
