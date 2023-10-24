const express= require('express');
const router =express.Router();
const client = require('../database'); 
const db=client.db(process.env.DB_NAME);

router.get('/:id',async (req,res)=>{
    const collection=db.collection('JobApplications');
    const jobInfo=await collection.find({job_id:req.params.id}).toArray();
    return res.json(jobInfo);
})

router.get('/user/:id',async (req,res)=>{
    const collection=db.collection('JobApplications');
    const jobInfo=await collection.find({userid: req.params.id}).toArray();
    return res.json(jobInfo);
})


router.post('/',async (req,res)=>{
    const collection=db.collection('JobApplications');
    console.log(req.body)
    const data={
        userid:req.body['userid'],
        job_id:req.body['job_title'],    
    }
    console.log(data)
    try{
    db.collection('JobApplications').insertOne(data);
    }
    catch(err){
    console.log(err);
    }
    return res.json("Success");
})


module.exports  = router