var mongoose = require("mongoose")
var {User} = require('../users/usersmodels')
var Paymentschema = new mongoose.Schema({
PaymentID:{
type:String,
unique:true,
required:true
},
Belongsto:{
type:mongoose.SchemaTypes.ObjectId,
ref:"User",
required:true
},
PaymentMadeat:{
type:Date,
required:true
}

})
var Payment = mongoose.model("Payments",Paymentschema,"PaymentsParkingsystem")
module.exports = {
Payment
}