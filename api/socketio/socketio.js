var socket_io = require('socket.io');
var socketio = {
    connect: (server) => {
        socketio.io = socket_io(server);
    }
};
module.exports = socketio;
