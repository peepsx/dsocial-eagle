let express = require('express');
let { Ip } = require('../models/ip');
let router = express.Router();

router.post('/', async (req, res) => {
    let { ip } = req.body;
    if( !ip ) return res.status(400).send({success: false, message: 'Fields is missing'})

    try {
        let address = ip.v4 === ip.v6 ? ip.v4 : [ip.v4, ip.v6]

        if(address.length === 2) {
            address = address.map(address_ip => address_ip);
        } else {
            address = [address];
        }

        let newIp = await Ip({
            ip_address: address
        })
        let oldIp = await Ip.findOne({ip_address: {$in: address}});

        if(oldIp) return res.status(403).send({success: false, message: 'This ip has been blocked please change your Ip'});

        await newIp.save();

        return res.status(200).send({
            success: true,
            message: 'Ip saved'
        })

    } catch (error) {
        console.log('IP ERROR', error)
        return res.status(200).send({
            success: true,
            message: 'Ip saved'
        })
    }

})

module.exports = router;