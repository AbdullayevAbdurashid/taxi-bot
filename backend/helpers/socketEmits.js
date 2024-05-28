// socketManager.js
const socketIO = require('socket.io');

let io;

function initialize(server) {
  io = socketIO(server,{
    cors: {
      origin: "*", // Or the appropriate origin you want to allow
      methods: ["GET", "POST"]
    }
  });
  
  io.on('connection', (socket) => {
    console.log('A client connected');
    // You can add any additional handling for new connections here
  });
}

function emitEvent(eventName, data) {
  if (io) {
    io.emit(eventName, data);
  } else {
    console.error('Socket.IO has not been initialized yet.');
  }
}

module.exports = {
  initialize,
  emitEvent
};
