const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const account = require('../../models/account.js');
const history_room_chat = require('../../models/history_room_chat');
const room_chat = require('../../models/room_chat.js');
const mongoose = require('mongoose');
const xor = require("buffer-xor");
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({extended: false}));
// parse application/json
router.use(bodyParser.json());
router.post('/', async(req, res) => {
    let tocken = req.body.tocken;
    let room_id = req.body.room_id;
    let message = req.body.message;
    console.log(message.type);
    console.log(req.body);
    if(!message || !room_id || !tocken){
        res.json({
            status:101
        });
        return;
    }
    try{
        console.log(receiver_id);
        let check = await Promise.all([room_chat.findById(room_id),account.findOne({
            tocken: tocken
        })]);
        console.log(check);
        if(!check[0] || !check[1]){
            res.json({
                status:101
            });
            return;
        }
        let result = await history_room_chat.create({
            room_id: mongoose.mongo.ObjectId(room_id),
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
