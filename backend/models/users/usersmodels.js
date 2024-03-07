var mongoose = require('mongoose')
var Userschema = new mongoose.Schema({
Name:{
type:String,
required:true,
unique:true
},
Email:{
type:String,
unique:true,
required:true
},//
PhoneNumber:{
type:String,
unique:true,
required:true
},
Dayofregistration:{
type:Date,
required:true,
},
Password:{
type:String,
required:true
}
})

var User = mongoose.model("User",Userschema,"ParkingsystemUsers")
module.exports = {
User
}