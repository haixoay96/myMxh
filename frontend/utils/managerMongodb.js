var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://duclinh:namnam@ds021346.mlab.com:21346/chatappbeetsoft';
var url = 'mongodb://localhost:27017/webchat';
var managerMongodb = {};
MongoClient.connect(url, (err, db) => {
    if (err) {
        console.log('Mongodb connect error! '+ __dirname);
        console.error(err);
        process.exit(0);
        return;
    }
    console.log('Mongodb connect successfull! '+__dirname);
    managerMongodb.db = db;
});
module.exports.managerMongodb = managerMongodb;
