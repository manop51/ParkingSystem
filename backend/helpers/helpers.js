var jwt = require("jsonwebtoken")
var dotenv = require("dotenv")
dotenv.config()


function ValidateToken(req,res,next){
try{
var TokenExtract = req.headers["authorization"]
if(!TokenExtract){
return res.status(202).send("Unauthorized")
}
var ValidToken = jwt.verify(TokenExtract,process.env.jwtSecret)
if(!ValidToken){
return res.status(202).send("Unauthorized")
}else{
next()
}
}catch(err){
console.log(err)
}

}


module.exports = {
ValidateToken
}
