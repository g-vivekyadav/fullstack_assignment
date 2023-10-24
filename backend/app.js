require('dotenv').config()
const express = require('express');
const loginRoute= require('./routes/loginData')
const registerRoute=require('./routes/registerData')
const jobData= require('./routes/jobData');
const app = express();
app.use(express.json());
app.use('/login',loginRoute);
app.use('/register', registerRoute);
app.use('/jobInfo',jobData);
app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${5000}`)
})