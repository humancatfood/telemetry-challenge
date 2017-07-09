import ACTIONS from '../actions';



export const defaultAppState = {
  shouldBeConnected: false,
  isConnected: false,
  isConnecting: false,

  speed: 0,
  minSpeed: 0,
  maxSpeed: 0,
  averageSpeed: 0

};



export default (state=defaultAppState, action) => {

  switch (action.type)
  {

    case ACTIONS.CONNECT_DASHBOARD:
      return {
        ...state,
        isConnecting: true,
        shouldBeConnected: true
      };

    case ACTIONS.DISCONNECT_DASHBOARD:
      return {
        ...state,
        shouldBeConnected: false
      };

    case ACTIONS.CONNECTION_ESTABLISHED:
      return {
        ...state,
        isConnecting: false,
        isConnected: true
      };

    case ACTIONS.CONNECTION_LOST:
      return {
        ...state,
        isConnected: false
      };

    default:
      return state;

  }

};

