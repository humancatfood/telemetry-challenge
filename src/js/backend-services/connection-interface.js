import Connection from './connection';

import { sanitizeData } from './data-sanitization';



class ConnectionInterface
{

  get url ()
  {
    return 'ws://interview.dev.ctx.ef.com/telemetry';
  }

  constructor (autoReconnect=true)
  {
    this.connection = null;
    this.shouldBeConnected = false;
    this.autoReconnect = autoReconnect;
    this.callbacks = {};
  }

  setCallbacks ({onConnecting, onConnected, onDisconnected, onMessage, onError})
  {
    this.callbacks.onConnecting = onConnecting;
    this.callbacks.onConnected = onConnected;
    this.callbacks.onDisconnected = onDisconnected;
    this.callbacks.onMessage = onMessage;
    this.callbacks.onError = onError;
  }

  connectToServer ()
  {
    this.shouldBeConnected = true;
    this._onConnecting();
    this.connection = new Connection({
      onOpen: this._onConnected.bind(this),
      onClose: this._onDisconnected.bind(this),
      onMessage: this._onMessage.bind(this),
      onError: this._onError.bind(this)
    });
  }

  disconnectFromServer ()
  {
    this.shouldBeConnected = false;
    this.connection.close();
    this.connection = null;
  }

  _onConnecting ()
  {
    this.callbacks.onConnecting && this.callbacks.onConnecting();
  }

  _onConnected ()
  {
    this.callbacks.onConnected && this.callbacks.onConnected();
  }

  _onDisconnected ()
  {
    this.callbacks.onDisconnected && this.callbacks.onDisconnected();

    if (this.shouldBeConnected && this.autoReconnect)
    {
      setTimeout(this.connectToServer.bind(this), 1000);
    }
  }

  _onMessage (msg)
  {
    sanitizeData(msg.data)
      .then(data => this.callbacks.onMessage && this.callbacks.onMessage(data))
      .catch(error => this._onError(error));
  }

  _onError (error)
  {
    this.callbacks.onError && this.callbacks.onError(error);
  }

}

export default new ConnectionInterface();
