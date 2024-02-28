var {User} = require('../../models/users/usersmodels')
var nodemailer = require("nodemailer")
var dotenv = require('dotenv')
dotenv.config()
var transporter = nodemailer.createTransport({
host:"smtp.gmail.com",
port:587,
auth:{
user:process.env.Email,
pass:process.env.Emailpassword
}
})

async function SendID(Id,Email){
var mailinfo  = await transporter.sendMail({
from:process.env.Email,
to:Email,
subject:"Your ID",
html:`<p>Your unique id is <span style = "color:gold; font-size:19px;">${Id}</span></p>`
})

}


async function RegisterUsers(req,res){

try{
var {Name,Email,PhoneNumber} = req.body
if(PhoneNumber.startsWith("254") == false || PhoneNumber.startsWith("254") == false){
res.status(202).send("wrong phone format")
return
}

var insertedUser =await User.create({Name,Email,PhoneNumber,Dayofregistration:new Date()})
await insertedUser.save()
await SendID(insertedUser._id,insertedUser.Email)
res.status(200).send("Saved")

}catch(err){
console.log(err)
} 


}



module.exports = {
RegisterUsers
}