var mongoose = require('mongoose')
var Parkingslotschema = new mongoose.Schema({
StreetName:{
    type:String,
    unique:true
},
AvailableSlots:{
type:Number,
required:true
},
IsfullyTaken:{
type:Boolean,
required:true
},
Charges:{
type:Number,
required:true
}

}) 
var Parking = mongoose.model("Parking",Parkingslotschema,"Parkingsystem")
module.exports = {
Parking
}