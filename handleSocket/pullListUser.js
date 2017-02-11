var async = require('async');
var managerMongodb = require('../utils/managerMongodb.js').managerMongodb;
var _ = require('lodash');
var handlePullListUser = (socket) => {
    socket.on('pullListUser', (data, response) => {
        if (socket.name) {
            async.waterfall([
                (callback) => {
                    managerMongodb.db.collection('Account').find({

                    }).sort({name:1}).toArray((error, docs) => {
                        if (error) {
                            callback(error);
                            return;
                        }
                        callback(null, docs);
                    });
                }
            ], (error, result) => {
                if (error) {
                    console.log('Get list room error!' + __dirname);
                    console.error(error);
                    response({
                        status: 101
                    });
                    return;
                }
                console.log('Get list room successfull!' + __dirname);
                var listSocket = _.values(socket.server.sockets.connected);
                var length = result.length;
                // handle data
                for (var i = 0; i < length; i++) {
                    var index = _.findIndex(listSocket, {
                        name: result[i].name
                    });
                    if (index !== -1) {
                        result[i].isOnline = true;
                    }
                }
                response({
                    status: 100,
                    listUser: result
                });
            });
        }
    });
}
module.exports.handlePullListUser = handlePullListUser;
