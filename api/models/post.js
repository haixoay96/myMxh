const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const post = new Schema({
    account_id: ObjectId,
    contents: [{
        type: String,
        content: String
    }],
    date_create: Date
});
module.exports = mongoose.model('post', post);
