import Menu from './webpages/app'
import Login from './webpages/login'
import SignUp from "./webpages/signup";
import Dashbord from './webpages/dashbord.js'
import Contacts from './webpages/contacts'
import Articles from './webpages/articles'
import CreatePost from './components/Articles/CreatePost';
import EditPost from './components/Articles/EditPost'
import Count from './webpages/profilUser'
import EditProfil from "./components/ProfilUser/EditProfilUser";

import {BrowserRouter, Routes, Route } from 'react-router-dom';


function App(){
	return (        
	<BrowserRouter>            
		 <Routes>
			<Route path='/' element={<Menu />}>                 
				<Route path="login" element={<Login />}/>  
				<Route path="signup" element={<SignUp />}/>               
				<Route path="dashbord" element={<Dashbord />}/> 
				<Route path="articles" element={<Articles/>}/>
				<Route path="createPost" element={<CreatePost/>}/>		    
				<Route path="article" element={<EditPost/>} />
				<Route path="contacts" element={<Contacts/>}/>
				<Route path="compte" element={<Count />} />
				<Route path="profil" element={<EditProfil/>} />
			</Route>		               
		</Routes>
	</BrowserRouter>
 );
}
export default App
// //const container = ;
// const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
// root.render(
// <BrowserRouter>
// 	<Routes>
// 		<Route path="/" element={<App />}>
// 			<Route path="login" element={<Login />}/>
// 			<Route path="signup" element={<SignUp />}/>
// 			<Route path="dashbord" element={<Dashbord />}/>
// 				<Route path="dashbord/contacts" element={<Contacts />} />
// 				<Route path="dashbord/articles" element={<Articles/>} />
// 				<Route path="edit-article/id" element={<EditPost/>} />
// 				<Route path="dashbord/compte" element={<Count />} />
// 				<Route path="edit-profil/id" element={<EditProfil/>} />
// 			</Route>			
// 	</Routes>
// </BrowserRouter>)



// import Menu from './webpages/app'

// function App() {
// 	return (
// 		<div>
// 			<Menu/>
// 		</div>
// 	)
// }

// export default App