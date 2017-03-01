var managerMongodb = require('../utils/managerMongodb.js').managerMongodb;
var ObjectID = require('mongodb').ObjectID;
var async = require('async');
var _ = require('lodash');
var handleAddRoom = (socket) => {
    socket.on('addRoom', (data, response) => {
        if (socket.name) {
            var name = data.name;
            var idRoom = data.idRoom;
            async.parallel({
                one: (callback) => {
                    managerMongodb.db.collection('Room').update({
                        _id: new ObjectID(idRoom)
                    }, {
                        $addToSet: {
                            listMember: name
                        }
                    }, (error, result) => {
                        if (error) {
                            console.log('loi');
                            callback(error);
                            return;
                        }
                        callback(null, result);
                    });
                },
                two: (callback) => {
                    managerMongodb.db.collection('Room').find({
                        _id: new ObjectID(idRoom)
                    }).toArray((error, docs) => {
                        if (error) {
                            callback(error);
                            return;
                        }
                        callback(null, docs);
                    });
                }
            }, (error, result) => {
                if (error) {
                    console.log('Add member error!' + __dirname);
                    console.error(error);
                    response({status: 101});
                    return;
                }
                console.log('Add successfull! ' + __dirname);
                response({status: 100});
                socket.broadcast.to(name).emit('changeRoom', {
                    _id: idRoom,
                    isCreate: true,
                    listMember: result.two[0].listMember,
                    name: result.two[0].name
                });
                socket.broadcast.to(idRoom).emit('changeMemberOfRoom', {
                    _id: idRoom,
                    name: name,
                    isJoin: true
                });
                var listSocket = _.values(socket.server.sockets.connected);
                // join socket into room
                var length = listSocket.length;
                for (var i = 0; i < length; i++) {
                    if (listSocket[i].name === name) {
                        listSocket[i].join(idRoom);
                    }
                }
            });
        }
    });
}
module.exports.handleAddRoom = handleAddRoom;
