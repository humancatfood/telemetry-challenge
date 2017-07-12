export default class Connection
{

  constructor (url, {onOpen, onClose, onMessage, onError})
  {
    this.connection = new WebSocket(url);

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

