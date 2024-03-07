var express = require('express')
var app = express()
var cors = require("cors")
// var http = require('http')
// var server = http.createServer(app)
var dotenv = require('dotenv')

dotenv.config()
var {Connectiondb} = require('./backend/Db/dbConnection')
app.use(express.json())
app.use(cors())


function Server(){
try{
app.use(require('./backend/router/router'))
}catch(err){
console.log(err)
}


app.listen(process.env.port,()=>{
console.log(`Server listening for request at ${process.env.port} `)
})


}

Server()