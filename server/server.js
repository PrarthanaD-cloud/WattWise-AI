const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

 console.log(
  "MongoDB Connected"
 );

});

const DeviceSchema =
new mongoose.Schema({

 email:String,

 name:String,

 usage:Number

});

const Device =
mongoose.model(
 "Device",
 DeviceSchema
);

app.get(
"/api/devices",
async(req,res)=>{

 try{

 const devices =
 await Device.find({

 email:
 req.query.email

 });

 res.json(devices);

 }

 catch(error){

 res.status(500)
 .json(error);

 }

}
);

app.post(
"/api/devices",
async(req,res)=>{

 try{

 const device =
 new Device({

 email:
 req.body.email,

 name:
 req.body.name,

 usage:
 req.body.usage

 });

 await device.save();

 res.json({

 success:true

 });

 }

 catch(error){

 res.status(500)
 .json(error);

 }

}
);

app.delete(
"/api/devices/:id",
async(req,res)=>{

 await Device.findByIdAndDelete(

 req.params.id

 );

 res.json({

 success:true

 });

}
);

app.listen(
5000,
()=>{

console.log(
"Server Running"
);

}
);