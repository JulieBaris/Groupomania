import {useNavigate} from "react-router-dom";
function Logout ()
{
     localStorage.clear()
     alert ("Oooooh, vous partez ? A très vite ! 👋")

     const navigate = useNavigate();
     navigate('/login')
}
export default Logout