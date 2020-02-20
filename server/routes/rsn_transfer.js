require('dotenv').config();
let express = require('express');
let config = require('../config/arisen');
let RSN = require('arisenjsv1');
let { UserAuth } = require('../models/user');
let { Rsn_Transfer } = require('../models/transfer');
let { RSN_TRANSFER, Access_Token } = require('../middleware/RSN_TRANSFER');
let rsn = new RSN(config)

let router = express.Router();

router.post('/rsn-transfer', [RSN_TRANSFER, Access_Token], async (req, res) => {
        let { username } = req.body;
        let arisen = await UserAuth.findOne(req.body);
        if(!arisen) {
            return res.status(200).send({
                suceess: false,
                message: 'user is not found'
            })
        }
        if(!username || username == undefined || username ==null) {
            return res.status(200).send({
                message: 'username fields is missing'
            });
        }
        
        if(arisen.username.length < 12) {
            return res.status(200).send({
                suceess: false,
                message: 'arisen username is not valid'
            })
        } else {
            rsn.transfer(process.env.TRASFERUSER, username, process.env.AMOUNT, '', config)
                .then(async (transfer) => {
                    let rsn_transfered = new Rsn_Transfer({
                        user: arisen._id,
                        amount: process.env.AMOUNT,
                        account_from_transfer: process.env.TRASFERUSER
                    })
                    if(transfer) {
                         await rsn_transfered.save()
                    }
                    return res.status(200).send({
                        suceess: true,
                        message: `Rsn has been sent to the user ${username} account sucessfully!`
                    })
                })
        }

})

module.exports = router;