var _ = require('lodash');
var managerMongodb = require('../utils/managerMongodb.js').managerMongodb;
var async = require('async');
var handleCreateRoom = (socket) => {
    socket.on('createRoom', (data, response) => {
        if (socket.name) {
            async.waterfall([
                (callback) => {
                    managerMongodb.db.collection('Room').insertOne({
                        name: data.name,
                        listMember: [socket.name]
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
                    console.log('Create room error!' + __dirname);
                    console.error(error);
                    response({
                        status: 101
                    });
                    return;
                }
                console.log('Create room successfull!' + __dirname);
                var listSocket = _.values(socket.server.sockets.connected);
                // join socket into room
                var length = listSocket.length;
                for (var i = 0; i < length; i++) {
                    if (listSocket[i].name === socket.name) {
                        listSocket[i].join(result.insertedId.toString());
                    }
                }
                response({
                    status: 100,
                    _id: result.insertedId
                });
            });
        }
    });
}
module.exports.handleCreateRoom = handleCreateRoom;
