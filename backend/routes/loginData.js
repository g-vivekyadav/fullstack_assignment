const express= require('express');
const router =express.Router();
const client = require('../database'); 
const db=client.db(process.env.DB_NAME);
router.post('/',async (req,res)=>{
    const collection=db.collection('UserData');
    const userData= await collection.findOne({"username":username,"password":password});
    if(!userData){
        res.json({message:"invalid username / password"});
    }
    else{
      return res.json({username:userData.username})
    }

})
  


module.exports=router;
