const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const account = require('../../models/account.js');
const history_one_by_one = require('../../models/history_one_by_one.js');
const mongoose = require('mongoose');
const xor = require("buffer-xor");
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({extended: false}));
// parse application/json
router.use(bodyParser.json());
router.post('/', async(req, res) => {
    let tocken = req.body.tocken;
    let receiver_id = req.body.receiver_id;
    let message = req.body.message;
    console.log(message.type);
    console.log(req.body);
    if(!message || !receiver_id || !tocken){
        res.json({
            status:101
        });
        return;
    }
    try{
        console.log(receiver_id);
        let check = await Promise.all([account.findById(receiver_id),account.findOne({
            tocken: tocken
        })]);
        console.log(check);
        if(!check[0] || !check[1]){
            res.json({
                status:101
            });
            return;
        }
        let x = new Buffer(check[0]._id.toString(), 'hex');
        let y = new Buffer(check[1]._id.toString(), 'hex');
        console.log(xor(x,y).toString('hex'));
        let result = await history_one_by_one.create({
            pair_account_id: mongoose.mongo.ObjectId(xor(x,y).toString('hex')),
            sender_id: check[1]._id,
            message: {
                type: message.type,
                content: message.content
            },
            date_create: new Date()
        });
        console.log(result);
        res.json({
            status: 100
        });
    }
    catch(e){
        console.log(e);
        res.json({
            status:101
        });
    }
   
});
module.exports = router;
