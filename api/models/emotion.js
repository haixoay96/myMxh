const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const emotion = new Schema({
    post_id: ObjectId,
    account_id: ObjectId,
    type: String
});
module.exports = mongoose.model('emotion', emotion);
