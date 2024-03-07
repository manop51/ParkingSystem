import Payparking from "./components/payParking"
import Success from "./success"
import Register from "./components/register"
import Login from "./components/login"
import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"
export default function App(){

return(
 <Router>
<Routes>
<Route path="/success" element= {<Success/>}/>
<Route  path="/pay/parking" element = {<Payparking/>}/>
<Route  path="/register" element = {<Register/>}/>
<Route  path="/" element = {<Login/>}/>
</Routes>


 </Router>
)

}