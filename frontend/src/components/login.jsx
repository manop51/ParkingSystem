import axios from "axios";
import { Link } from "react-router-dom";
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import Preloader from "../preloader";
export default function Login(){
let navigate = useNavigate()
const [Email,setEmail] = useState("")
const [Password,setPassword] = useState("")
const [Errormsg,setErrormsg] = useState("")
const [Loader,setLoader] = useState(false)
async function handleLogin(e){
  setLoader(true)
    try{
    e.preventDefault()
  var Payload = {
 Email:Email,
 Password:Password
  }
var response = await axios.post("http://localhost:4500/login/user",Payload)
if(response.data  === "No matching email"){
setErrormsg(response.data)
setLoader(false)
return
}else if (response.data == "Password mismatch"){
setErrormsg(response.data)
setLoader(false)
return
}else if(response.data.msg == "logged"){
setTimeout(()=>{
navigate("/pay/parking")
},2500)
return
}
}catch(err){
console.log(err)
 }
}




return(
<div className="forms">
<nav>

<img src="data:image/png;base64,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" alt="" />
</nav>

{Loader ? (<Preloader/>):(

<form onSubmit={handleLogin}>
<strong>Login For Parking</strong>
<div>
<input type="email" placeholder="Enter Your email "required onChange={(e)=>setEmail(e.target.value)} />
</div>
<div>
<input type="password" placeholder="Enter Your Password" required onChange={(e)=>setPassword(e.target.value)}/>  
</div>


<button>
Login
</button>
</form>
)}


<Link to='/register'><p>Need an Account?</p></Link>



<p className="Error">{Errormsg}</p>
</div>


)

}