import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import configureStore from './data/store';
import connectionInterface from './backend-services/connection-interface';
import { connecting, connected, disconnected, receiveData } from './data/actions';

import Dashboard from './components/Dashboard';



export default class App extends React.Component
{
  constructor(props, context)
  {
    super(props, context);

    const store = this.store = configureStore();

    connectionInterface.setCallbacks({
      onConnecting: () => store.dispatch(connecting()),
      onConnected: () => store.dispatch(connected()),
      onDisconnected: () => store.dispatch(disconnected()),
      onMessage: data => store.dispatch(receiveData(data)),
      onError: error => window.console.error(error)
    });

  }

  render ()
  {
    return (
      <ReduxProvider store={ this.store } >
        <Dashboard />
      </ReduxProvider>
    );
  }
}
