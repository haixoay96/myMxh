var express = require('express');
var router = express.Router();
router.use('/login', require('./api/login.js'));
router.use('/signup', require('./api/signup.js'));
router.use('/logout', require('./api/logout.js'));
router.use('/sendtoone', require('./api/sendtoone.js'));
router.use('/sendtoroom', require('./api/sendtoroom.js'));
module.exports = router;
