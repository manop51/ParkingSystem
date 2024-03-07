var express = require('express')
var Router = express.Router()
var {CreateParkingSlot,Getaccesstokensaf,HandleStkpush,ValidatePaymentstatus} = require('../controllers/parking/parkingcont')
var {RegisterUsers,HandleLogin} = require('../controllers/users/Userscont')


var {ValidateToken} = require('../helpers/helpers')

Router.post('/create/parkingslots',CreateParkingSlot)
Router.get('/get/accesstoken',Getaccesstokensaf)
Router.post("/test/payment",ValidateToken,HandleStkpush)
Router.post("/confirm/payment",ValidatePaymentstatus)

// register users
Router.post('/create/users',RegisterUsers)
Router.post('/login/user',HandleLogin)
module.exports = Router
 

