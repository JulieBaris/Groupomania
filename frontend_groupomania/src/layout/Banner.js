import '../styles/index.scss'
import logo from '../assets/icon-left-font-monochrome-black.svg'
import {useNavigate} from "react-router-dom";

function Banner() 
{
	// Récupération du token et de l'id de l'utilisateur
	let userId = localStorage.getItem('userIsConnected');
	// Si l'utilisateur est connecté, la banner affichera un bouton LogOut.
	let navigate = useNavigate();
	function LogOut ()
	{
		// suppression des infos contenues dans le localstorage lors de la déconnexion puis retour à l'accueil
		window.localStorage.clear();
		navigate('/')
		window.location.reload()  
	}
	// Suivant le cas, le banner sera différent	
	const ifUserNotConnected = (
		<header className='groupomania-banner-logout'>
			<img src={logo} alt='groupomania' className='groupomania-logo' />
		</header>
	)
	const UserConnected = (
		<header className='groupomania-banner-connected'>
			<div className='Logo'>
				<img src={logo} alt='groupomania' className='groupomania-logo' />
			</div>
			<div className='bloc-btn'>
				<i className="fa-solid fa-person-walking-arrow-right" onClick={LogOut} aria-label='déconnexion' name='déconnexion' tabIndex={0} role="button"></i>
			</div>
		</header>
	)
	if(userId === null)
	{
		return ifUserNotConnected
	}
	else
	{
		return UserConnected
	}
	
}

export default Banner