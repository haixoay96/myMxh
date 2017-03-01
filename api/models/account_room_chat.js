const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const account_room_chat = new Schema({
  account_id: ObjectId,
  room_id: ObjectId,
  date_create: Date
});
module.exports = mongoose.model('account_room_chat', account_room_chat);
