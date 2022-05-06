import Loading from '../components/Loading'
import Banner from '../layout/Banner'
import Footer from '../layout/Footer'
import Profil from '../components/ProfilUser'

function ProfilUser() {
	return (
		<div>
			<Loading/>
			<Banner/>
			<Profil/>
			<Footer />
		</div>
	)
}

export default ProfilUser