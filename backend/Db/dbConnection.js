var dotenv = require("dotenv")
dotenv.config()


var mongoose = require('mongoose')
var Connectiondb = mongoose.connect(process.env.DB).then(()=>{
console.log('Connection To Db success')
}).catch((err)=>{
console.log(err)
})
module.exports = {
Connectiondb
}