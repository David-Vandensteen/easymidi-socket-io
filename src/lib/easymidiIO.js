import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import easymidi from 'easymidi';
import { MidiNormalizer } from '#src/lib/midiNormalizer';

const { log } = console;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const easymidiIO = {};
easymidiIO.getInputs = () => easymidi.getInputs();
easymidiIO.getOutputs = () => easymidi.getOutputs();
easymidiIO.startServer = (midiOutput, port, { midiInput } = {}) => {
  if (port === undefined) throw new Error('port is undefined');
  if (midiOutput === undefined) throw new Error('midi device is undefined');

  const out = new easymidi.Output(midiOutput);

  app.get('/', (req, res) => {
    res.send('<h1>easymidi-socket.io</h1>');
  });

  server.listen(port, () => {
    log('listening on *:', port);
  });

  io.on('connection', (socket) => {
    log('a user connected');
    socket.on('midi', (message) => {
      log('received midi message from io client', message);
      const normalizedMessage = MidiNormalizer.message(message);
      const { _type } = message;
      // eslint-disable-next-line no-underscore-dangle
      delete normalizedMessage._type;
      out.send(_type, normalizedMessage);
    });
    socket.on('dispose', () => {
      log('dispose');
      out.close();
    });
  });
};

export default easymidiIO;
export {
  easymidi,
  easymidiIO,
};
