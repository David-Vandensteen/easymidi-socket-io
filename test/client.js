import io from 'socket.io-client';
import { easymidiIO } from '#src/lib/easymidiIO';

const { log } = console;

easymidiIO.startServer('mcc-in', 3000);
const ioClient = io.connect('http://localhost:3000', { reconnect: true });

ioClient.on('connect', () => {
  log('Connected!');
  ioClient.emit('midi', {
    controller: 37,
    value: 64,
    channel: 0,
    _type: 'cc',
  });
});

log(easymidiIO.getInputs());
