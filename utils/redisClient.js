var redis = require('redis');
var redisClient = redis.createClient();
redisClient.del('listUserOnline', (error, reply) => {
    if (error) {
        console.log('Clear data error! ' + __dirname);
        console.error(error);
        return;
    }
    console.log('Clear data successfull! ' + __dirname);
});
redisClient.on('connect', () => {
    console.log('Redis connect successfull! ' + __dirname);

});
redisClient.on('error', (err) => {
    console.log('Redis connect failure! ' + __dirname);
    process.exit(0);
});
module.exports.redisClient = redisClient;
