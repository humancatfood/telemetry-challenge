import ACTIONS from '../actions';



export const defaultAppState = {
  connected: false,
  connecting: false,

  speed: 0,
  minSpeed: 0,
  maxSpeed: 0,
  averageSpeed: 0

};



export default (state=defaultAppState, action) => {

  switch (action.type)
  {

    default:
      return state;

  }

};

