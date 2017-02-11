var _ = require('lodash');
var handleLogin = require('./login.js').handleLogin;
var handleDisconnect = require('./disconnect.js').handleDisconnect;
var handleSendMessage = require('./sendMessage.js').handleSendMessage;
var handlePullListMessage = require('./pullListMessage.js').handlePullListMessage;
var handleCreateRoom = require('./createRoom').handleCreateRoom;
var handleSendGroup = require('./sendGroup.js').handleSendGroup;
var handlePullListGroup = require('./pullListGroup.js').handlePullListGroup;
var handleAddRoom = require('./addRoom.js').handleAddRoom;
var handleLeaveRoom = require('./leaveRoom.js').handleLeaveRoom;
var handlePullListUser = require('./pullListUser.js').handlePullListUser;
var handlePullListRoom = require('./pullListRoom.js').handlePullListRoom;
var handleConnection = (io) => {
    io.on('connection', (socket) => {
        handleLogin(socket);
        handleSendMessage(socket);
        handlePullListMessage(socket);
        handlePullListGroup(socket);
        handlePullListUser(socket);
        handlePullListRoom(socket);
        handleCreateRoom(socket);
        handleSendGroup(socket);
        handleAddRoom(socket);
        handleLeaveRoom(socket);
        handleDisconnect(socket);
    });
}
module.exports.handleConnection = handleConnection;
