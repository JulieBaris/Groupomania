import '../styles/index.scss'
import logo from '../assets/icon-left-font-monochrome-black.png'

function Banner() 
{
	const insertText = (
		<div className='groupomania-banner'>
			<img src={logo} alt='groupomania' className='groupomania-logo' />
		</div>
	)
	return insertText
}

export default Banner