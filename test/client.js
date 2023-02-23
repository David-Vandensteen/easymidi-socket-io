import io from 'socket.io-client';

const { log } = console;

const ioClient = io.connect('http://localhost:3000', { reconnect: true });

ioClient.on('connect', () => {
  log('Connected!');
  ioClient.emit('midi', {
    controller: 37,
    value: 64,
    channel: 0,
    _type: 'cc',
  });
  ioClient.emit('dispose');
});
