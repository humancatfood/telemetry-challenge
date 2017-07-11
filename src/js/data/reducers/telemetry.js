import ACTIONS from '../actions';



export const defaultTelemetryState = {
  speed: 0,
  minSpeed: 0,
  maxSpeed: 0,
  averageSpeed: 0,
  numSpeedRecords: 0,
  sumSpeed: 0,

  altitude: 0,
  minAltitude: 0,
  maxAltitude: 0,
  averageAltitude: 0,
  numAltitudeRecords: 0,
  sumAltitude: 0

};



export default (state=defaultTelemetryState, action) => {

  switch (action.type)
  {

    case ACTIONS.RECEIVE_DATA: {
      const { telemetry: {airspeed, altitude} } = action.payload;

      // TODO: the stuff needed to calculate the average speed & altitude should probably live somewhere else!
      const sumSpeed = state.sumSpeed + airspeed;
      const sumAltitude = state.sumAltitude + altitude;
      const numSpeedRecords = state.numSpeedRecords += 1;
      const numAltitudeRecords = state.numAltitudeRecords += 1;

      return {
        ...state,

        sumSpeed,
        sumAltitude,
        numSpeedRecords,
        numAltitudeRecords,

        speed: airspeed,
        minSpeed: Math.min(airspeed, state.minSpeed),
        maxSpeed: Math.max(airspeed, state.maxSpeed),
        averageSpeed: sumSpeed / numSpeedRecords,

        altitude: altitude,
        minAltitude: Math.min(altitude, state.minAltitude),
        maxAltitude: Math.max(altitude, state.maxAltitude),
        averageAltitude: sumAltitude / numAltitudeRecords

      };
    }

    default:
      return state;

  }

};

