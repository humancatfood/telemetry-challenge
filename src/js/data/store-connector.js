import Connection from './connection-service';

import { connectionEstablished, connectionLost, receiveData } from './actions';



export default class StoreConnector
{

  constructor (autoReconnect=true)
  {
    this.store = null;
    this.connection = null;
    this.autoReconnect = autoReconnect;
  }

  connectToStore (store)
  {
    this.store = store;
    store.subscribe(() => {
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

    const { connection: shouldBeConnected} = this.store.getState();
    if (shouldBeConnected && this.autoReconnect)
    {
      setTimeout(this.connectToServer.bind(this), 1000);
    }
  }

  onMessage (msg)
  {
    try
    {
      const data = JSON.parse(msg.data);
      this.store.dispatch(receiveData(data));
    }
    catch (e)
    {
      window.console.error('onMessage-error:', e, msg);
    }
  }

  onError (...args)
  {
    window.console.error('onError:', args);
  }

}
