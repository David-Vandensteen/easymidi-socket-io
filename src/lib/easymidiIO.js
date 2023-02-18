/* eslint-disable max-classes-per-file */
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import easymidi from 'easymidi';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const easymidiIO = {};
easymidiIO.getInputs = () => easymidi.getInputs();
easymidiIO.getOutputs = () => easymidi.getOutputs();
easymidiIO.startServer = (port) => {
  if (port === undefined) throw new Error('port is undefined');
  app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
  });

  server.listen(port, () => {
    console.log('listening on *:', port);
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('midi', (message) => {
      console.log('received midi message from io client', message);
    });
  });
};

easymidiIO.Input = class Input extends easymidi.Input {

};

easymidiIO.Output = class Output extends easymidi.Output {
  send(...options) {
    console.log('send', options);
    const [type, message] = options;
    super.send(type, message);
    io.emit('midi', options);
    return this;
  }
};

export default easymidiIO;
export {
  easymidi,
  easymidiIO,
};
