import Connection from './connection-service';

import { connectionEstablished, connectionLost, receiveData } from './actions';



export default class StoreConnector
{

  constructor (store)
  {
    this.store = null;
    this.connection = null;
  }

  connect (store)
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
      this.connection = new Connection({
        onOpen: this.onOpen.bind(this),
        onClose: this.onClose.bind(this),
        onMessage: this.onMessage.bind(this),
        onError: this.onError.bind(this)
      });
    }
    else if (this.connection && !state.connection.shouldBeConnected)
    {
      this.connection.close();
      this.connection = null;
    }
  }

  onOpen ()
  {
    this.store.dispatch(connectionEstablished());
  }

  onClose ()
  {
    this.store.dispatch(connectionLost());
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
