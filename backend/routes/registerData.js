const express= require('express')
const router =express.Router()
const client = require('../database'); 
const db=client.db(process.env.DB_NAME);
router.post('/',async (req,res)=>{
    const authHeader = req.body;
    console.log(authHeader)
    if (!authHeader.username || !authHeader.password) {
        return res.status(401).json({ message: 'username and password are missing' });
    }
    const collection=db.collection('UserData');
    fullname=authHeader.name;
    username=authHeader.username;
    password=authHeader.password;
    const userData= await collection.findOne({"username":username});
    if(userData){
        res.json({message:"username already exists"});
    }
    else{
        const userData={"fullname":fullname, "username":username, "password":password}
        await collection.insertOne(userData);
        res.json({message:"Registered successfully"})
    }

})



module.exports=router;