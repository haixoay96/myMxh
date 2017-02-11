var managerMongodb = require('../utils/managerMongodb.js').managerMongodb;
var async = require('async');
var handleSendGroup = (socket) => {
    socket.on('sendGroup', (data, response) => {
        if (socket.name) {
            var idRoom = data.idRoom;
            var content = data.content;
            var type = data.type;
            var nameSender = socket.name;
            async.waterfall([(callback) => {
                    managerMongodb
                        .db
                        .collection('Group')
                        .insertOne({
                            idRoom: idRoom,
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
                    console.log('Insert messsage group error! ' + __dirname);
                    console.error(error);
                    response({status: 101});
                    return;
                }
                console.log(nameSender + ' send messsage to ' + idRoom + ' ' + __dirname);
                socket
                    .broadcast
                    .to(idRoom)
                    .emit('receiveGroup', result.ops[0]);
                response({status: 100, messsage: result.ops[0]});
            });
        }
    });
}
module.exports.handleSendGroup = handleSendGroup;