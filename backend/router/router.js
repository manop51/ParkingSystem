var express = require('express')
var Router = express.Router()
var {CreateParkingSlot,Getaccesstokensaf,HandleStkpush,ValidatePaymentstatus} = require('../controllers/parking/parkingcont')

var {RegisterUsers} = require('../controllers/users/Userscont')

Router.post('/create/parkingslots',CreateParkingSlot)
Router.get('/get/accesstoken',Getaccesstokensaf)
Router.post("/test/payment",HandleStkpush)
Router.post("/confirm/payment",ValidatePaymentstatus)

// register users
Router.post('/create/users',RegisterUsers)
module.exports = Router
 

