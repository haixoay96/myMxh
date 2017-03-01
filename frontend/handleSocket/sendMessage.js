var getString = require('../utils/getString.js');
var _ = require('lodash');
var async = require('async');
var managerMongodb = require('../utils/managerMongodb.js').managerMongodb;
var handleSendMessage = (socket) => {
    socket.on('sendMessage', (data, response) => {
        if (socket.name) {
            var content = data.content;
            var type = data.type;
            var nameReceiver = data.nameReceiver;
            var nameSender = socket.name;
            var roomCode = getString(nameSender, nameReceiver);
            async.waterfall([
                (callback) => {
                    managerMongodb.db.collection('History').insertOne({
                        roomCode: roomCode,
                        nameSender: nameSender,
                        content: content,
                        type: type,
                        dateCreate: new Date()
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
                    console.error(error);
                    console.log('Send messsage error');
                    response({
                        status: 101
                    });
                }
                console.log();
                response({
                    status: 100,
                    messsage: result.ops[0]
                });
                socket.broadcast.to(data.nameReceiver).emit('receiveMessage',result.ops[0]);
            });
        }
    });
}
module.exports.handleSendMessage = handleSendMessage;
