var express = require('express');
var router = express.Router();
const sgMail = require('@sendgrid/mail');
let bcrypt = require('bcryptjs');
const  { EVerify } = require('../models/Email')
const { body, validationResult } = require('express-validator');
let {EMAIL_KEY} = require('../config/index');

let generator = require('generate-password');

router.post('/send-email',[
    body('email').isEmail(),
], async (req, res) => {
    try {
        let { email, username } = req.body;
        let errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(200).json({errors: errors.array()});
        }
        let findOne = await EVerify.findOne({email})
        if(findOne !== null) {
            return res.status(200).json({success: false, message: 'Email already exist'});
        }
      
        var password = generator.generate({
            length: 6,
            numbers: true,
            uppercase: false
        });

        let newTempUser = new EVerify({
            email: email,
            token: password,
            username: username
        })
    
                sgMail.setApiKey(EMAIL_KEY);
                const msg = {
                  to: email,
                  from: 'noreply@peepsx.com', // Use the email address or domain you verified above
                  subject: 'Email Verification Code | dSocial',
                  text: 'and easy to do anywhere, even with Node.js',
                  html: `<!DOCTYPE html>
                  <html lang="en">
                  <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  
                  <style type="text/css">
                  .container{
                      max-width: 60%;
                      border: 0px solid #ddd;
                      background: #f3f6ff;
                      text-align: center;
                      margin: auto;
                      padding: 50px;
                  }
                  .mail-body{
                      background: #fff;
                      padding: 5%;
                      border-radius: 5%;
                  }
                  .logo img {
                      max-width: 100px;
                  }
                  
                  
                  </style>
                  </head>
                  <body>
                      <div class="main">
                          <div class="container">
                              <div class="main-temp">
                                  <div class="mail-body">
                                      <div class="logo">
                                          <img src="https://signup.dsocial.network/assets/img/arisen/dsocial.png" alt="dsocial logo">
                                      </div>
                                      <h2>Your Email Verification Code</h2>
                                      <p>Please enter the following verification code into the dSocial signup wizard:</p>
                                      <p><b>${newTempUser.token}</b></p>
                                  </div>
                              </div>
                  
                          </div>
                      </div>
                  </body>
                  </html>
                  `,
                };
                //ES6
                sgMail
                  .send(msg)
                  .then(async (send) => {
                   await newTempUser.save()
                    res.status(200).send(
                        {
                            success: true,
                            message: 'Email successfully sent',
                            data: send
                        }
                    )
                  }, error => {
                    console.error(error);
                
                    if (error.response) {
                      console.error(error.response.body)
                    }
                  });                
    } catch (error) {
        console.log('SENDING EMAIL', error)
        return res.status(500).send({success: false, message: "server error"})
    }
})

router.post('/send-token', async (req, res) => {
    let { code, amount } = req.body;

    try {
        let token = await EVerify.findOne({token: code})
        if(token) {
          let verified =  await EVerify.findOneAndUpdate({username:token.username}, {$set: {tokenverified: true}}, {new: true})
           
            console.log("email token verified",token);
                    return res.status(200).json({
                        success: true,
                        message:   `Code successfully verified`
                    })
        } else {
            return res.status(200).json({
                success: false,
                message: 'Sorry, the verification code was incorrect. Please try again.'
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({error: 'Internal Server Error'})
    }
     
})

module.exports = router