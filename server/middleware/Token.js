require('dotenv').config();
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let {faceAuth} = require('../models/facebook');

module.exports = {
    Token: async (password, id) => {
        return new Promise(async function(resolve, reject) {
            let user = await faceAuth.findOne({_id: id});
            if(!user) return reject({success: false, message: 'User not found'});
    
            let matched =  await bcrypt.compare(password, user.password);
            if(!matched) {
                reject({
                    success: false,
                    message: 'Bad Request'
                })
            }
    
            let payload = {
                user: {
                    id: user.id
                }
            }
    
            jwt.sign(payload, process.env.JWT, {expiresIn: '1h'}, (err, token) => {
                if(err) {
                    return reject({
                        success: false,
                        message: 'Bad Request'
                    })
                }
                return resolve({success:  true, token: token})
            })
        })
    }
}