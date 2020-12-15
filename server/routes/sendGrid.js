var express = require('express');
var router = express.Router();

let generator = require('generate-password');

router.post('/send-email', async (req, res) => {
    try {
        let { username } = req.body;
        if(username.length !== 12 || username === null || username === undefined || username === '') 
            return res.status(200).send({success: false, message: 'username is invalid'})
        let findOne = await userAuth.findOne({username: username})
        let TempFb = await userAuthTemp.findOne({username: username})

        if(TempFb) return res.status(200).send({
                    success: true,
                    token: TempFb.token,
                    message:'You have logged in successfully!',
            })
        
        if(findOne) return res.status(403).send({
                success: false,
                message: 'You have already register with us!'
            })
        
        var password = generator.generate({
            length: 10,
            numbers: true
        });
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        let newTempUser = new userAuthTemp({
            username: username
        })
        newTempUser.password = hash;
        newTempUser.save()
            .then(async (us) => {
                let jsonToken = await Token(password, us.id);
                newTempUser.token = jsonToken.token;
                await newTempUser.save();
                if(jsonToken.success !== true) return res.status(401).send({success: false, message: 'Password in valid'});

                res.status(200).send(
                    {
                        success: true,
                        message: 'You have logged in successfully!',
                        token: jsonToken.token,
                        access_token: true
                    }
                )
            })
            .catch(e => {
                console.error("USER REGISTER", e)
                return res.status(401).send(e)
            })
    } catch (error) {
        console.log('REGISTER USER', error)
        return res.status(500).send({success: false, message: "server error"})
    }
})

module.exports = router