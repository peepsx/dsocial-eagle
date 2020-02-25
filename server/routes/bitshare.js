var express = require('express')
var router = express.Router();
const {BitshareApi} = require('../models/bitshare')
var generator = require('generate-password')
let bcrypt = require('bcryptjs');

router.post('/bitshare', async (req,res)=>{
    var password = generator.generate({
        length: 10,
        numbers: true
    });
 
   try {
       
      let {arisen_username, bts_username , transaction_id, arisen_id} = req.body
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(password, salt)
      if(arisen_username && bts_username && transaction_id && arisen_id){
            let newBitshare = new BitshareApi({
                arisen_username:arisen_username,
                bts_username:bts_username,
                transaction_id:transaction_id,
                arisen_id:arisen_id
            })
            newBitshare.password = hash
            newBitshare.save()
            .then(()=>{
                res.status(200).send({
                    success:true,
                    message:"Data is Saved"
                }).catch(e =>{
                    console.log("something went wrong" + e)
                })

                
            })
      } else {
              res.status(403).send({
                  message:"User Already Register"
              })
      }

   } catch (error) {
    res.status(500).send({
        message: "Something went Wrong"
    })  
   }



})




module.export = router