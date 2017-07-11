import connectionInterface from './../backend-services/connection-interface';




const ACTIONS = {
  CONNECTING: 'CONNECTING',
  CONNECTED: 'CONNECTED',
  DISCONNECTED: 'DISCONNECTED',

  RECEIVE_DATA: 'RECEIVE_DATA',

  TOGGLE_LANDING_GEAR: 'TOGGLE_LANDING_GEAR'
};


export const connecting = () => ({
  type: ACTIONS.CONNECTING
});


export const connected = () => ({
  type: ACTIONS.CONNECTED
});


export const disconnected = () => ({
  type: ACTIONS.DISCONNECTED
});


export const receiveData = data => ({
  type: ACTIONS.RECEIVE_DATA,
  payload: data
});


export const toggleLandingGear = on => dispatch => {

  dispatch({
    type: ACTIONS.TOGGLE_LANDING_GEAR,
    payload: {
      on
    }
  });
  connectionInterface.toggleLandingGear(on);

};


export default ACTIONS;
