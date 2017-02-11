var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var handleIo = require('./handleSocket/io.js').handleIo;
var http = require('http').createServer(app).listen(process.env.PORT || 3000, function() {
    console.log('server running port ' + (process.env.PORT || 3000));
});
var io = require('socket.io')(http);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/font-awesome'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/lodash'));
app.use(express.static('node_modules/react/dist'));
app.use(express.static('node_modules/react-dom/dist'));
app.use(express.static('node_modules/babel-standalone'));
app.use('/', require('./router/home.js'));
app.use('/post', require('./router/postImage.js'));
handleIo(io);