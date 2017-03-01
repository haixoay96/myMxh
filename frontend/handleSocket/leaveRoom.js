var async = require('async');
var managerMongodb = require('../utils/managerMongodb.js').managerMongodb;
var handleLeaveRoom = (socket) => {
    socket.on('leaveRoom', (data, response) => {
        if (socket.name) {
            var idRoom = data.idRoom;
            async.waterfall([
                (callback) => {
                    managerMongodb.db.collection('Room').update({
                        idRoom: idRoom
                    }, {
                        $pull: {
                            listMember: socket.name
                        }
                    }, {
                        multi: true
                    }, (error, result) => {
                        if (error) {
                            callback(error);
                            return;
                        }
                        callback(null, result);
                    });
                }
            ], (error, result) => {
                if (error) {
                    console.log('Leave error!' + __dirname);
                    console.error(error);
                    response({
                        status: 101
                    });
                    return;
                }
                response({
                    status: 100
                });
                socket.broadcast.to(idRoom).emit('changeMemberOfRoom', {
                    idRoom: idRoom,
                    name: socket.name,
                    idJoin: false
                });
            });
        }
    });
}
module.exports.handleLeaveRoom = handleLeaveRoom;
