import {useNavigate} from "react-router-dom";
function Logout ()
{
     localStorage.removeItem("userIsConnected")
     localStorage.removeItem('accessToken')

     const navigate = useNavigate();
     navigate('/login')
}
export default Logout