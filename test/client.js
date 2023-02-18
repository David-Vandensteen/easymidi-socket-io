import io from 'socket.io-client';
import { easymidiIO } from '#src/lib/easymidiIO';

easymidiIO.startServer(3000);
const out = new easymidiIO.Output('mcc-in');

const ioClient = io.connect('http://localhost:3000', { reconnect: true });

ioClient.on('connect', () => {
  console.log('Connected!');
  ioClient.emit('midi', {
    controller: 37,
    value: 64,
    channel: 0,
    _type: 'cc',
  });
});

console.log(easymidiIO.getInputs());
