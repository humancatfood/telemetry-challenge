
const url = 'ws://interview.dev.ctx.ef.com/telemetry';
const connection = new WebSocket(url);
window.console.log(connection);

function logger(type) {
  return function () {
    window.console.info(type, ":", arguments);
  };
}


connection.onopen = logger('onopen');

connection.onclose = logger('onclose');

connection.onerror = logger('onerror');

connection.onmessage = logger('onmessage');

window.c = connection;
