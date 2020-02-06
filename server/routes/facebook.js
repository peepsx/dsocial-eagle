var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
    let data = req.body
    console.log('data from front', data);
    res.json([
        { status: 'succesfully recieved' }
    ])
})

module.exports = router