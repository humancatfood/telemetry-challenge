const ACTIONS = {
  CONNECTING: 'CONNECTING',
  CONNECTED: 'CONNECTED',
  DISCONNECTED: 'DISCONNECTED',

  RECEIVE_DATA: 'RECEIVE_DATA'
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


export default ACTIONS;
