let express = require('express');
let router = express.Router();

router.post('/share-facebook-status', async (req, res) => {

    let {status} = req.body;
    console.log('Share',typeof status)
    if(!status || status == null) return res.status(200).send({success: false, message: 'Fields is missing!'})
    if(status === undefined ) return res.status(200).send({success: false, message: 'user have not share post with their friends!'})
    try {
        if(status == '[]') {
            res.status(200).send({
                success: true,
                message: 'user share or post with thier friends successfully!'
            })
        } else {
            res.status(200).send({
                success: false,
                message: 'user have not share or post with thier friends!'
            })
        }
    } catch(e) {
        console.log('ERROR WHILE SHARE_WITH_FACEBOOK', e)
        res.status(401).send({
            success: false,
            message: 'ERROR WHILE SHARE_WITH_FACEBOOK'
        })
    }
})

module.exports = router;