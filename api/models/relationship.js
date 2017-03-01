
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const relationship = new Schema({
    user1: ObjectId,
    user2: ObjectId,
    date_create: Date
});
module.exports = mongoose.model('relationship', relationship);
