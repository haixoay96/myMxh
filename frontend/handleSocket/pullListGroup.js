var managerMongodb = require('../utils/managerMongodb.js').managerMongodb;
var async = require('async');
var handlePullListGroup = (socket) => {
    socket.on('pullListGroup', (data, response) => {
        if (socket.name) {
            var idRoom = data.idRoom;
            var length = data.length;
            async.waterfall([
                (callback) => {
                    managerMongodb.db.collection('Group').find({
                        idRoom: idRoom
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
                    console.log('Get list Group error!' + __dirname);
                    console.error(error);
                    response({
                        status: 101
                    });
                    return;
                }
                console.log('Get list group successfull!' + __dirname);
                response({
                    status: 100,
                    listChat: result
                });
            });
        }
    });
}
module.exports.handlePullListGroup = handlePullListGroup;
