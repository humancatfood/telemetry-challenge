const ACTIONS = {
  CONNECT_DASHBOARD: 'CONNECT_DASHBOARD',
  DISCONNECT_DASHBOARD: 'DISCONNECT_DASHBOARD',

  CONNECTION_ESTABLISHED: 'CONNECTION_ESTABLISHED',
  CONNECTION_LOST: 'CONNECTION_LOST',
};


export const connectDashboard = () => ({
  type: ACTIONS.CONNECT_DASHBOARD
});


export const disconnectDashboard = () => ({
  type: ACTIONS.DISCONNECT_DASHBOARD
});


export const connectionEstablished = () => ({
  type: ACTIONS.CONNECTION_ESTABLISHED
});


export const connectionLost = () => ({
  type: ACTIONS.CONNECTION_LOST
});


export default ACTIONS;
