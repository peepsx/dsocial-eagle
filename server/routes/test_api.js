let express  = require('express');

let router = express.Router();

router.get('/test-api', async (req, res) => {
    return res.status(200).send({
        message: 'Test-api running sucessfully '
    })
})

module.exports = router