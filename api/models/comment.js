const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const comment = new Schema({
    post_id: ObjectId,
    account_id: ObjectId,
    comment: {
        type: String,
        content: String
    }
});
module.exports = mongoose.model('comment', comment);
