import ACTIONS from '../actions';



export const defaultTelemetryState = {
  speed: 0,
  minSpeed: 0,
  maxSpeed: 0,
  averageSpeed: 0,

  altitude: 0,
  minAltitude: 0,
  maxAltitude: 0,
  averageAltitude: 0,

};



export default (state=defaultTelemetryState, action) => {

  switch (action.type)
  {

    case ACTIONS.RECEIVE_DATA: {
      const { telemetry } = action.payload;
      return {
        ...state,
        speed: telemetry.airspeed,
        altitude: telemetry.altitude
      };
    }

    default:
      return state;

  }

};

