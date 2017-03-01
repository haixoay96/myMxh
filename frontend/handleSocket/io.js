var handleConnection = require('./connection.js').handleConnection;
var handleIo = (io) => {
    handleConnection(io);
}
module.exports.handleIo = handleIo;
