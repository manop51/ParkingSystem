var {Parking} = require('../../models/parkingSlots/parkslotmodel')
const axios = require('axios')
var nodemailer = require("nodemailer")

var dotenv = require('dotenv')
const { text } = require('body-parser')
dotenv.config()

var transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port:587,
  auth:{
  user:process.env.Email,
  pass:process.env.Emailpassword
  }
})


async function SendPaymentEmail(EmailAddress,Ticketid,Vehichle,StreetName){
var sentMail = await transporter.sendMail({
from:process.env.Emailpassword,
to:EmailAddress, 
subject:"Payment Receipt",
html:`<p>Dear Esteemed Customer Your Ticket ID is <h1>${Ticketid}</h1> For Vehicle <h1>${Vehichle}<h1/> for StreetName:${StreetName}</p>`
})

}





async function CreateParkingSlot(req,res){
try{
var {StreetName,AvailableSlots,IsfullyTaken} = req.body
var createdSlot = await Parking.create({StreetName,AvailableSlots,IsfullyTaken,Charges:200})
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

async function HandleStkpush(req,res){
var AccessToken = await Getaccesstokensaf()
console.log(AccessToken)
// query for Street name
var QueryStreet = req.query.StreetName
if(!QueryStreet){
res.status(200).send("Streetname must be provided")
return
}
var QueriedSteet =await Parking.findOne({StreetName:{'$regex':QueryStreet}})
if(!QueriedSteet){
res.status(202).send("Street name invalid")
return
}
var EmailAddress = req.body.Email
if(!EmailAddress){
res.status(200).send("An email address must be provided")
return
}
var Carnoplate = req.body.Carplate
if(!Carnoplate){
res.status(200).send("A car No plate must be provided")
return
}




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
    Amount:200,    
    PartyA:req.body.Phone,    
    PartyB:testBusinessshortcode,    
    PhoneNumber:req.body.Phone,     
    CallBackURL:"https://c099-2c0f-fe38-2207-d7f8-add9-142-da7f-a749.ngrok-free.app",    
    AccountReference:"Nyeri E-Parking payment",    
    TransactionDesc:"Nyeri E-parking payment"
 } 

var response = await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",safPayload,{
headers:{authorization:`Bearer ${AccessToken}`}
})
console.log(response)
await SendPaymentEmail(EmailAddress,response.data.CheckoutRequestID,Carnoplate,QueriedSteet.StreetName)

}
 


async function ValidatePaymentstatus(Checkout){
var Accesstoken = await Getaccesstokensaf()
console.log(Accesstoken)
var businessShortcode = "174379"
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
var Password = new Buffer.from(businessShortcode + passkey + timestamp).toString("base64")
console.log(Password)
  

var response =await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",{
    BusinessShortCode:businessShortcode,
    Password:Password,
    Timestamp:timestamp,
    CheckoutRequestID:Checkout,
  },{
    headers:{Authorization:`Bearer ${Accesstoken}`} 
    }
)
console.log(response)




} 





module.exports = {
CreateParkingSlot,
Getaccesstokensaf,
HandleStkpush,
ValidatePaymentstatus
}