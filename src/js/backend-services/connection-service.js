export default class Connection
{
  get url ()
  {
    return 'ws://interview.dev.ctx.ef.com/telemetry';
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
    this.connection.send(data);
  }

  close ()
  {
    this.connection.close();
  }

}

