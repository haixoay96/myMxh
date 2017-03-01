const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const room_chat = new Schema({
    name: String,
    date_create: Date
});
module.exports = mongoose.model('room_chat', room_chat);
