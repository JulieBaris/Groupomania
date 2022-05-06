
import AllArticles from '../components/Post'
import AllComments from '../components/Comment'
import PersonList from '../components/Users'

function Dashbord() {
	return (
			<div>
				<AllArticles/>
				<AllComments/>
				<PersonList/>
			</div>
		)
}

export default Dashbord