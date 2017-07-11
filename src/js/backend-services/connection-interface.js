import Connection from './connection';

import { sanitizeData } from './data-sanitization';
import MetaBuffer from './buffer';



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

    this.speedMetaBuffer = new MetaBuffer();
    this.altitudeMetaBuffer = new MetaBuffer();
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

  toggleLandingGear (on)
  {
    this.connection && this.connection.send({
      controls: {
        landing_gear: on
      }
    });
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
      .then(data => this._calculateMetaData(data))
      .then(data => this.callbacks.onMessage && this.callbacks.onMessage(data))
      .catch(error => this._onError(error));
  }

  _onError (error)
  {
    this.callbacks.onError && this.callbacks.onError(error);
  }

  _calculateMetaData (data)
  {
    return new Promise(resolve => {

      const {telemetry: {airspeed, altitude}, control} = data;

      this.speedMetaBuffer.update(altitude);
      this.altitudeMetaBuffer.update(airspeed);

      resolve({
        telemetry: {
          airspeed,
          altitude,

          minSpeed: this.speedMetaBuffer.min,
          maxSpeed: this.speedMetaBuffer.max,
          averageSpeed: this.speedMetaBuffer.average,

          minAltitude: this.altitudeMetaBuffer.min,
          maxAltitude: this.altitudeMetaBuffer.max,
          averageAltitude: this.altitudeMetaBuffer.average
        },
        control
      });
    });
  }

}

export default new ConnectionInterface();
