var async = require('async');
var managerMongodb = require('../utils/managerMongodb.js').managerMongodb;
var handlePullListRoom = (socket) => {
    socket.on('pullListRoom', (data, response) => {
        if (socket.name) {
            async.waterfall([
                (callback) => {
                    managerMongodb.db.collection('Room').find({
                        listMember: socket.name
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
                    console.log('Get list room error!' + __dirname);
                    console.error(error);
                    response({
                        status: 101
                    });
                    return;
                }
            /*    result.forEach((item, i)=>{
                    item._id = item._id.toString();
                });*/
                response({
                    status: 100,
                    listRoom: result
                });
            });
        }
    });
}
module.exports.handlePullListRoom = handlePullListRoom;
