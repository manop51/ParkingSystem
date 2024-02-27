var mongoose = require('mongoose')
var Connectiondb = mongoose.connect("mongodb://127.0.0.1:27017/Parking").then(()=>{
console.log('Connection To Db success')
}).catch((err)=>{
console.log(err)
})
module.exports = {
Connectiondb
}