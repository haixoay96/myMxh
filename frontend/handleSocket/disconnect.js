var _ = require('lodash');
var handleDisconnect = (socket) => {
    socket.on('disconnect', () => {
        if (socket.name) {
            var listSocket = _.values(socket.server.sockets.connected);
            var index = _.findIndex(listSocket, {
                name: socket.name
            });
            if (index === -1) {
                socket.broadcast.emit('changeUser', {
                    name: socket.name,
                    isOnline: false
                });
                console.log(socket.name + ' logout! ' + __dirname);
            }
        }
        console.log(socket.id + ' disconnect!' + __dirname);
    });
}
module.exports.handleDisconnect = handleDisconnect;
