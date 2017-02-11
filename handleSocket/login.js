var _ = require('lodash');
var async = require('async');
var managerMongodb = require('../utils/managerMongodb.js').managerMongodb;
var handleLogin = (socket) => {
    socket.on('login', (data, response) => {
        if (socket.name) {
            console.log('This socket have logined! ' + __dirname);
            response({
                status:101
            });
            return;
        }
        var name = data.name;
        async.waterfall([
            (callback) => {
                managerMongodb.db.collection('Account').insertOne({
                    name: name
                }, (error, result) => {
                    if (error) {
                        console.log('Error when insert!');
                        console.error(error);
                        callback(error);
                        return;
                    }
                    callback(null, result);
                });
            }
        ], (error, result) => {
            if (error) {
                if (error.code !== 11000) {
                    response({
                        status: 102
                    });
                    return;
                }
            }
        //    console.log(result);
            var listSocket = _.values(socket.server.sockets.connected);
            var index = _.findIndex(listSocket, {
                name: name
            });
            if (index === -1) {
                socket.broadcast.emit('changeUser', {
                    name: name,
                    isOnline: true
                });
            }
            socket.name = name;
            socket.join(name);
            response({
                status: 100
            });
            async.waterfall([
                (callback) => {
                    managerMongodb.db.collection('Room').find({
                        listMember: name
                    }).toArray((error, docs) => {
                        if (error) {
                            callback(error);
                            return;
                        }
                        callback(null, docs);
                    });
                }
            ], (error, result) => {
                if (error) {
                    console.log('Get list Room error!' + __dirname);
                    console.error(error);
                    return;
                }
                console.log('Get list Room successfull! !' + __dirname);
                console.log(result);
                var length = result.length;
                for (var i = 0; i < length; i++) {
                    console.log(typeof result[i]._id.toString());
                    socket.join(result[i]._id.toString());
                }
            });
        });
    });
}
module.exports.handleLogin = handleLogin;
