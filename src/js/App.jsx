import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import configureStore from './data/store';
import StoreConnector from './data/store-connector';

import Dashboard from './components/Dashboard';



export default class App extends React.Component
{
  constructor(props, context)
  {
    super(props, context);

    this.store = configureStore();
    const storeConnector = new StoreConnector();
    storeConnector.connectToStore(this.store);
  }

  render ()
  {
    return (
      <ReduxProvider store={ this.store } >
        <Dashboard/>
      </ReduxProvider>
    );
  }
}
