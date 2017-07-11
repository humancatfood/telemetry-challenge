import ACTIONS from '../actions';



export const defaultTelemetryState = {
  airspeed: 0,
  altitude: 0,

  minSpeed: 0,
  maxSpeed: 0,
  averageSpeed: 0,

  minAltitude: 0,
  maxAltitude: 0,
  averageAltitude: 0
};


export default (state=defaultTelemetryState, action) => {

  switch (action.type)
  {

    case ACTIONS.RECEIVE_DATA:
      return {
        ...state,
        ...action.payload.telemetry
      };

    case ACTIONS.DISCONNECTED:
      return {
        ...state,
        airspeed: 0,
        altitude: 0
      };

    default:
      return state;

  }

};

