// import utils
import '../styles/index.scss'
import { Outlet, Link } from "react-router-dom";


export default function App() {
  return (
    <div className='bloc'>
      <h1>Le réseau social Groupomania</h1>
      <nav>
        <Link to="/login">Login</Link> 
        <Link to="/signup">SignUp</Link>
      </nav>
      <Outlet />
    </div>
  );
}