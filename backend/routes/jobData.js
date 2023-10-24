const express= require('express');
const router =express.Router();
const client = require('../database'); 
const db=client.db(process.env.DB_NAME);
router.get('/all',async (req,res)=>{
    const collection=db.collection('JobsData');
    const jobInfo=await collection.find({}).toArray();
    return res.json(jobInfo);
})


router.get('/:id',async (req,res)=>{
    const collection=db.collection('JobsData');
    const jobInfo=await collection.find({job_id: req.params.id}).toArray();
    return res.json(jobInfo);
})



async function generateUniqueJobId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let jobId;
    let existingJob;
    do {
      jobId = '';
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        jobId += characters.charAt(randomIndex);
      }
  
      // Check if the generated ID already exists in the database
      existingJob = await db.collection('JobsData').findOne({ job_id: jobId });
    } while (existingJob);
  
    return jobId;
  }
  



router.post('/',async (req,res)=>{
    const collection=db.collection('JobsData');
    console.log(req.body)
    const job_id=await generateUniqueJobId();
    const data={
        job_id:job_id,
        job_title:req.body['job_title'],
        job_description:req.body['job_description']        
    }
    console.log(data)
    try{
    db.collection('JobsData').insertOne(data);
    }
    catch(err){
    console.log(err);
    }
    return res.json("Hello");
})

module.exports=router;