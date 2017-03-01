var _ = require('lodash');
var getString = require('../utils/getString.js');
var async = require('async');
var managerMongodb = require('../utils/managerMongodb.js').managerMongodb;
var handlePullListMessage = (socket) => {
    socket.on('pullListMessage', (data, response) => {
        if (socket.name) {
            var name = data.name;
            var length = data.length;
            var roomCode = getString(socket.name, name);
            async.waterfall([
            (callback) => {
                managerMongodb.db.collection('History').find({
                        roomCode: roomCode
                    }).sort({dateCreate:-1}).limit(10).skip(length).toArray((error, docs) => {
                        if (error) {
                            callback(error);
                            return;
                        }
                        docs.reverse();
                        callback(null, docs);
                    });
                }
            ], (error, result) => {
                if (error) {
                    console.log('Get listMessage error! ' + __dirname);
                    console.error(error);
                    response({
                        status: 101
                    });
                    return;
                }
                console.log('get successfull!');
                response({
                    status: 100,
                    listChat: result
                });
            });
        }
    });
}
module.exports.handlePullListMessage = handlePullListMessage;
