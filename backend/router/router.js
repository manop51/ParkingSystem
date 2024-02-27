var express = require('express')
var Router = express.Router()
var {CreateParkingSlot,Getaccesstokensaf,HandleStkpush} = require('../controllers/parking/parkingcont')



Router.post('/create/parkingslots',CreateParkingSlot)
Router.get('/get/accesstoken',Getaccesstokensaf)
Router.post("/test/payment",HandleStkpush)
module.exports = Router
 

