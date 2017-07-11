import ACTIONS from '../actions';



export const defaultConnectionState = {
  isConnected: false,
  isConnecting: false
};


export default (state=defaultConnectionState, action) => {

  switch (action.type)
  {

    case ACTIONS.CONNECTED:
      return {
        ...state,
        isConnecting: false,
        isConnected: true
      };

    case ACTIONS.CONNECTING:
      return {
        ...state,
        isConnecting: true,
        isConnected: false
      };

    case ACTIONS.DISCONNECTED:
      return {
        ...state,
        isConnecting: false,
        isConnected: false
      };

    default:
      return state;

  }

};

