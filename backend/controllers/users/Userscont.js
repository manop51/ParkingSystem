var {User} = require('../../models/users/usersmodels')
var nodemailer = require("nodemailer")
var dotenv = require('dotenv')
var bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken")
dotenv.config()
var transporter = nodemailer.createTransport({
host:"smtp.gmail.com",
port:587,
auth:{
user:process.env.Email,
pass:process.env.Emailpassword
}
})

async function SendID(Email){
var mailinfo  = await transporter.sendMail({
from:process.env.Email,
to:Email,
subject:"Sign up",
text:"Thanks For signing up To the Nyeri Eparking services"
})

}


async function RegisterUsers(req,res){
var Passwordinput = req.body.Password
var hashedPassword = await bcrypt.hash(Passwordinput,11)
try{
var {Name,Email,PhoneNumber} = req.body
if(PhoneNumber.startsWith("254") == false || PhoneNumber.startsWith("254") == false){
res.status(202).send("wrong phone format")
return
}

var insertedUser =await User.create({Name,Email,PhoneNumber,Dayofregistration:new Date(),Password:hashedPassword})
await insertedUser.save()
await SendID(insertedUser.Email)
var EmailUser = insertedUser.Email
var token = jwt.sign({EmailUser},process.env.jwtSecret,{expiresIn:"900s"})
res.status(200).json({
"msg":"saved",
"data":token
})

}catch(err){
console.log(err)
} 

}



async function HandleLogin(req,res){
try{
var inputEmail = req.body.Email
var inputPassword =req.body.Password

var matchingUser = await User.findOne({Email:inputEmail})
if(!matchingUser){
return res.status(200).send("No matching email")
}
var MatchingPassword = await bcrypt.compare(inputPassword,matchingUser.Password)
if(MatchingPassword == false){
return res.status(202).send("Password mismatch")
}else{
var token = jwt.sign({inputEmail},process.env.jwtSecret,{expiresIn:"900s"})
return res.status(200).json({
"msg":"logged",
"data":token
})
}

}catch(err){
console.log(err)
}

}



module.exports = {
RegisterUsers,
HandleLogin
}