export default class Connection
{
  get url ()
  {
    return 'wss://interview.dev.ctx.ef.com/telemetry';
  }

  constructor ({onOpen, onClose, onMessage, onError})
  {
    this.connection = new WebSocket(this.url);

    this.connection.onopen = onOpen;
    this.connection.onclose = onClose;
    this.connection.onmessage = onMessage;
    this.connection.onerror = onError;
  }

  send (data)
  {
    this.connection.send(JSON.stringify(data));
  }

  close ()
  {
    this.connection.close();
  }

}

