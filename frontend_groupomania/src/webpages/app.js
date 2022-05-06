import Loading from '../components/Loading'
import App from '../components/App'
import Banner from '../layout/Banner'
import Footer from '../layout/Footer'

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