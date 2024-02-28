var mongoose = require('mongoose')
var {User} = require("../users/usersmodels")
var Carsschema = new mongoose.Schema({
NumberPlate:{
type:String,
unique:true,
required:true
},
Ownedby:{
type:mongoose.SchemaTypes.ObjectId,
ref:"User",
required:true
}

})

var Cars = mongoose.model("Cars",Carsschema,"Vehichles")
module.exports = {
Cars
}