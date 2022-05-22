import '../styles/index.scss'

function Footer() 
{
	// Récupération du token et de l'id de l'utilisateur
	let userId = localStorage.getItem('userIsConnected');	 
	
	const ifUserConnected = 
	(
		<footer className='groupomania-footer'>
			<div className='groupomania-footer-elem'>
				<p className='p-footer'>Nous n'attendions plus que vous !</p>
				<p className='p-footer'>😍</p>
			</div>
		</footer>
	)
	const elseUserNotConnected = 
	(
		<footer className='groupomania-footer'>
			<div className='groupomania-footer-elem'>
				<p className='p-footer'>Devenez membre du réseau social Goupomania</p>
				<p className='p-footer'>😍</p>
			</div>
		</footer>
	)

	if(userId !== null)
	{
		return ifUserConnected
	}
	else
	{
		return elseUserNotConnected
	}
}
export default Footer