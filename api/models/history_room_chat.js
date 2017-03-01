const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const history_room_chat = new Schema({
    room_chat_id: ObjectId,
    sender_id: ObjectId,
    message: {
        type: String,
        content: String
    },
    date_create: Date
});
module.exports = mongoose.model('history_room_chat', history_room_chat);
