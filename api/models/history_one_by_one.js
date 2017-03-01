const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const history_one_by_one = new Schema({
    pair_account_id: ObjectId,
    sender_id: ObjectId,
    message: Object,
    date_create: Date
});
module.exports = mongoose.model('history_one_by_one', history_one_by_one);
