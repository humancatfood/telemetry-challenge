import ACTIONS from '../actions';



export const defaultTelemetryState = {
  speed: 0,
  minSpeed: 0,
  maxSpeed: 0,
  averageSpeed: 0,
  speedRecords: [],

  altitude: 0,
  minAltitude: 0,
  maxAltitude: 0,
  averageAltitude: 0,
  altitudeRecords: [],

};



export default (state=defaultTelemetryState, action) => {

  switch (action.type)
  {

    case ACTIONS.RECEIVE_DATA: {
      const { telemetry: {airspeed, altitude} } = action.payload;
      const speedRecords = state.speedRecords.concat(airspeed);
      const altitudeRecords = state.altitudeRecords.concat(altitude);
      return {
        ...state,

        speedRecords,
        altitudeRecords,

        speed: airspeed,
        minSpeed: Math.min(airspeed, state.minSpeed),
        maxSpeed: Math.max(airspeed, state.maxSpeed),
        averageSpeed: speedRecords.reduce((a,b) => a + b) / speedRecords.length,

        altitude: altitude,
        minAltitude: Math.min(altitude, state.minAltitude),
        maxAltitude: Math.max(altitude, state.maxAltitude),
        averageAltitude: altitudeRecords.reduce((a,b) => a + b) / altitudeRecords.length,

      };
    }

    default:
      return state;

  }

};

