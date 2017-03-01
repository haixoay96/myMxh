const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const account = require('../../models/account.js');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({extended: false}));
// parse application/json
router.use(bodyParser.json());
router.post('/', async(req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let nickname = req.body.nickname;
    if(!username || !password || !email || !nickname){
        res.json({
            status:101
        });
        return;
    }
    try {
        let result = await account.create({
            username: username,
            password: password, 
            nickname: nickname,
            email:email, 
            tocken: (new Date()).getTime(),
            date_create: new Date()
        });
        console.log(result);
        res.json({
            status:100
        });
    } catch (e) {
        console.log(e);
        res.json({
            status:101
        });
    }
});
module.exports = router;
