export default class Connection
{
  get url ()
  {
    window.console.log('getting');
    return 'ws://interview.dev.ctx.ef.com/telemetry';
  }

  constructor ({onOpen, onClose, onMessage, onError})
  {
    window.console.log("constructor:", this);
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

