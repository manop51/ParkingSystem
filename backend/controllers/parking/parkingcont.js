var {Parking} = require('../../models/parkingSlots/parkslotmodel')
const axios = require('axios')

var dotenv = require('dotenv')
dotenv.config()
async function CreateParkingSlot(req,res){
try{
var {StreetName,AvailableSlots,IsfullyTaken,Charges} = req.body
var createdSlot = await Parking.create({StreetName,AvailableSlots,IsfullyTaken,Charges})
await createdSlot.save()
res.status(202).send("Created")

}catch(err){
console.log(err)
}
}



//pay for slot at a given street
//validate that the parking slot is free if not send alert not free
//pay via stk push or instasend check out

// first generate access token
async function Getaccesstokensaf(){
var Consumersecret = process.env.Consumersecret
var ConsumerKey  = process.env.ConsumerKey 
var CreatedAuthorization = new Buffer.from(`${ConsumerKey}:${Consumersecret}`).toString("base64")
var response  = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",{
headers:{Authorization:`Basic ${CreatedAuthorization}`}
})

var TokenGrant = response.data.access_token

return TokenGrant 

}

async function HandleStkpush(){
var AccessToken = await Getaccesstokensaf()
console.log(AccessToken)
var testBusinessshortcode = '174379'
 var now = new Date();
var year = now.getFullYear();
var month = String(now.getMonth() + 1).padStart(2, '0');
var date = String(now.getDate()).padStart(2, '0');
var hour = String(now.getHours()).padStart(2, '0');
var minute = String(now.getMinutes()).padStart(2, '0');
var second = String(now.getSeconds()).padStart(2, '0'); 
var timestamp = year + month + date + hour + minute + second;
console.log(timestamp)
var passkey = process.env.Passkey
var Password = new Buffer.from(testBusinessshortcode + passkey + timestamp).toString("base64")
console.log(Password)
var safPayload = {    
    BusinessShortCode: testBusinessshortcode,    
    Password: Password,    
    Timestamp:timestamp,    
    TransactionType: "CustomerPayBillOnline",    
    Amount: "1",    
    PartyA:"254759857032",    
    PartyB:testBusinessshortcode,    
    PhoneNumber:"254759857032",    
    CallBackURL: "https://user-service-b9az.onrender.com",    
    AccountReference:"Test",    
    TransactionDesc:"Test"
 }

var response = await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",safPayload,{
headers:{authorization:`Bearer ${AccessToken}`}
})
console.log(response)

}



module.exports = {
CreateParkingSlot,
Getaccesstokensaf,
HandleStkpush
}