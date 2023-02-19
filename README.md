# easymidi-socket-io
A simple Node.js library that allows users to send MIDI messages over a web socket connection using the easymidi and socket.io libraries.

# Usage
1. Import the easymidiIO object from the easymidi-socket.io module in your Node.js application.
2. Call the startServer method on the easymidiIO object, passing in the name of the MIDI device you want to use and the port number you want the server to listen on.
3. Use the io object provided by the socket.io library to send and receive MIDI messages over the web socket connection.

## Client side
```javascript
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
});
```

## Server side
```javascript
import { easymidiIO } from '#src/lib/easymidiIO';
easymidiIO.startServer('mcc-in', 3000);
```

# API
`easymidiIO`  
An object that provides access to the easymidi library and the startServer method for starting the web socket server.

`easymidiIO.getInputs()`  
Returns an array of available MIDI input devices.

`easymidiIO.getOutputs()`  
Returns an array of available MIDI output devices.

`easymidiIO.startServer(midiDevice, port)`  
Starts the web socket server and sets up a listener for incoming MIDI messages.

midiDevice: The name of the MIDI output device to use.
port: The port number to listen on for incoming web socket connections.
`easymidi`  
An object that provides access to the easymidi library.
