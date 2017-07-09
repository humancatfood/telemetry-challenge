import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import configureStore from './data/store';

import Dashboard from './components/Dashboard';


export default () => (
  <ReduxProvider store={ configureStore() } >

    <Dashboard/>

  </ReduxProvider>
);
