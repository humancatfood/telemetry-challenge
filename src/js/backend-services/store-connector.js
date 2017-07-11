import Connection from './connection-service';

import { sanitizeData } from './data-sanitization';
import { connectionEstablished, connectionLost, receiveData } from '../data/actions';



export default class StoreConnector
{

  constructor (autoReconnect=true)
  {
    this.store = null;
    this.connection = null;
    this.unsubscribeFn = null;
    this.autoReconnect = autoReconnect;
  }

  connectToStore (store)
  {
    if (this.unsubscribeFn)
    {
      this.unsubscribeFn();
    }

    this.store = store;
    this.unsubscribeFn = store.subscribe(() => {
      this.onStoreUpdate(store.getState());
    });
  }

  onStoreUpdate (state)
  {
    if (!this.connection && state.connection.shouldBeConnected)
    {
      this.connectToServer();
    }
    else if (this.connection && !state.connection.shouldBeConnected)
    {
      this.disconnectFromServer();
    }
  }

  connectToServer ()
  {
    this.connection = new Connection({
      onOpen: this.onOpen.bind(this),
      onClose: this.onClose.bind(this),
      onMessage: this.onMessage.bind(this),
      onError: this.onError.bind(this)
    });
  }

  disconnectFromServer ()
  {
    this.connection.close();
    this.connection = null;
  }

  onOpen ()
  {
    this.store.dispatch(connectionEstablished());
  }

  onClose ()
  {
    this.store.dispatch(connectionLost());

    const { connection: { shouldBeConnected }} = this.store.getState();
    if (shouldBeConnected && this.autoReconnect)
    {
      setTimeout(this.connectToServer.bind(this), 1000);
    }
  }

  onMessage (msg)
  {
    sanitizeData(msg.data)
      .then(data => this.store.dispatch(receiveData(data)))
      .catch(error => window.console.error(error));
  }

  onError (...args)
  {
    window.console.error('onError:', args);
  }

}
