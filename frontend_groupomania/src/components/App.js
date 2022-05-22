// import utils
import '../styles/index.scss'
import { Outlet, Link } from "react-router-dom";

export default function App() {
  const userId = localStorage.getItem('userIsConnected')
  const token = "Bearer " + localStorage.getItem('accessToken')

  if(userId === null || token === null)
  {
    return (
    <main className='bloc'>
      <h1 className='app-h1'>Bienvenue 😍 </h1>
        <nav>
          <Link to="login" className='Link'>Login</Link> 
          <Link to="signup" className='Link'>SignUp</Link>
        </nav>
      <Outlet />
    </main>);
    }
  else
  {
    return (
    <div className='bloc'>
        <nav>
          <div className='bloc-Link'>
            <Link to="articles" className='Link'><i class="fa-solid fa-newspaper"></i>Articles</Link>
            <Link to="contacts" className='Link'><i class="fa-solid fa-address-book"></i>Contacts</Link> 
            <Link to="compte" className='Link'><i class="fa-solid fa-circle-user"></i>Compte</Link>
          </div>
        </nav>
      <Outlet />
    </div>);
  } 
}