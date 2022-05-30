// import utils
import '../styles/index.scss'
import { Outlet, Link } from "react-router-dom";

export default function Menu() {
  const userId = localStorage.getItem('userIsConnected')
  const token = "Bearer " + localStorage.getItem('accessToken')

  if(userId === null || token === null)
  {
    return (
    <main className='bloc'>
        <nav>
          <Link to="login" className='Link'aria-label='connexion' name='connexion' tabIndex={0} role="button">Login</Link> 
          <Link to="signup" className='Link' aria-label='inscription'name='inscription' tabIndex={0} role="button">SignUp</Link>
          <Link to="loginAdmin" className='Link'aria-label='connexion' name='connexion' tabIndex={0} role="button">Admin</Link>
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
          <Link to="/dashbord" className='Link' aria-label='menu' name='menu' tabIndex={0} role="button"><i className="fa-solid fa-house-user"></i>Home</Link>
            <Link to="articles" className='Link' aria-label='articles' name='articles' tabIndex={0} role="button"><i className="fa-solid fa-newspaper"></i>Articles</Link>
            <Link to="contacts" className='Link' aria-label='contacts' name='contacts' tabIndex={0} role="button"><i className="fa-solid fa-address-book"></i>Contacts</Link> 
            <Link to="compte" className='Link' aria-label='profil' name='profil' tabIndex={0} role="button"><i className="fa-solid fa-circle-user"></i>Profil</Link>
          </div>
        </nav>
      <Outlet />
    </div>);
  } 
}