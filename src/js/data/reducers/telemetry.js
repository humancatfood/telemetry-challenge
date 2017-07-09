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
        minSpeed: Math.min(telemetry.airspeed, state.minSpeed),
        maxSpeed: Math.max(telemetry.airspeed, state.maxSpeed),

        altitude: telemetry.altitude,
        minAltitude: Math.min(telemetry.altitude, state.minAltitude),
        maxAltitude: Math.max(telemetry.altitude, state.maxAltitude),

      };
    }

    default:
      return state;

  }

};

