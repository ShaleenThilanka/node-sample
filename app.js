
const express = require('express');
const mongoose=require('mongoose')
const userRoute = require("./routes/UserRoute");
const bodyParser=require('body-parser');
const  cors=require('cors')

const app = express();
app.use(cors());
require('dotenv').config();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const serverPort=process.env.SERVER_PORT

mongoose.connect('mongodb://localhost:27017/gohomegota',()=>{
  app.listen(serverPort,()=>{
    console.log(`#GoHomeGota server is up & running on :${serverPort}`)
  })
});


app.use('/api/v1/user',userRoute);

