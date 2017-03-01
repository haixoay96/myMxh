const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const account = new Schema({
    username: String,
    nickname: String,
    password: String,
    tocken: String,
    email: String,
    date_create: Date
});
module.exports = mongoose.model('account', account);
