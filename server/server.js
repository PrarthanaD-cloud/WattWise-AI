const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// DATABASE

mongoose
.connect(process.env.MONGO_URI)
.then(() => {

 console.log(
  "MongoDB Connected"
 );

})
.catch((err) => {

 console.log(err);

});

// MODEL

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

// GET DEVICES

app.get(
"/api/devices",
async(req,res)=>{

try{

const devices=
await Device.find({

email:
req.query.email

});

res.json(
devices
);

}
catch(error){

console.log(error);

res.status(500)
.json(error);

}

}
);

// ADD DEVICE

app.post(
"/api/devices",
async(req,res)=>{

try{

const device=
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

console.log(error);

res.status(500)
.json({

error:
"Failed To Add Device"

});

}

}
);

// DELETE DEVICE

app.delete(
"/api/devices/:id",
async(req,res)=>{

try{

await Device.findByIdAndDelete(

req.params.id

);

res.json({

success:true

});

}
catch(error){

console.log(error);

res.status(500)
.json(error);

}

}
);

const PORT =
process.env.PORT || 5000;

app.listen(
PORT,
()=>{

console.log(

`Server Running On ${PORT}`

);

}
);