const socketIO = require('socket.io');

module.exports = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join', (eventId) => {
      socket.join(eventId);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};
