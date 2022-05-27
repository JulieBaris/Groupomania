import Loading from '../components/Loading'
import App from '../components/App'
import Banner from './Banner'
import Footer from './Footer'

function Menu() {
	return (
		<div>
			<Loading/>
			<Banner/>
			<App/>
			<Footer />
		</div>
	)
}

export default Menu