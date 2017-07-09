import { combineReducers } from 'redux';

import connection from './connection';
import telemetry from './telemetry';
import controls from './controls';



export default combineReducers({
  connection,
  controls,
  telemetry
});
