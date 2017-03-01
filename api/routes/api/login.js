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
    try {
        let result = await account.findOne({
            username: username, 
            password: password
        });
        console.log(result);
        res.json({
            status:100,
            tocken: result.tocken,
            _id: result._id
        });
    }catch(e){
        console.log(e);
        res.json({
            status:101
        });
    }
});
module.exports = router;
