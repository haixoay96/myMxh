const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const account = require('../../models/account.js');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({extended: false}));
// parse application/json
router.use(bodyParser.json());

router.post('/', async(req, res) => {
    let tocken = req.body.tocken;
    if(!tocken){
        res.json({
            status:101
        });
        return;
    }
    try {
        let result = await account.findOneAndUpdate({
            tocken: tocken
        }, {
            tocken: (new Date()).getTime()
        });
        console.log(result);
        res.json({
            status:100
        });
    }catch(e){
        console.log(e);
        res.json({
            status:101
        });
    }
});
module.exports = router;
