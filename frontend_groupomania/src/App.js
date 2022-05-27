import Menu from './webpages/app'
import Login from './webpages/login'
import SignUp from "./webpages/signup";
import LoginAdmin from './components/Auth/LoginAmin';
import Dashbord from './webpages/dashbord.js'
import Contacts from './webpages/contacts'
import AdminDeleteProfil from './components/Users/AdminDeleteProfil';
import Articles from './webpages/articles'
import CreatePost from './components/Articles/CreatePost';
import MyPosts from './components/Articles/MyPosts';
import EditPost from './components/Articles/EditPost'
import DeletePost from './components/Articles/AdminDeletePost';
import Count from './webpages/profilUser'
import EditProfil from "./components/ProfilUser/EditProfilUser";
import Comments from './components/Comments/Comments';
import CreateComment from './components/Comments/CreateComment';

import {BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDeleteComment from './components/Comments/DeleteComments';
import EditComment from './components/Comments/EditComment';





function App(){
	return (        
	<BrowserRouter>            
		 <Routes>
			<Route path='/' element={<Menu />}>                 
				<Route path="login" element={<Login />}/>
				<Route path="loginAdmin" element={<LoginAdmin />}/>
				<Route path="signup" element={<SignUp />}/>  

				<Route path="dashbord" element={<Dashbord />}/>

				<Route path="articles" element={<Articles/>}/>
				<Route path="createPost" element={<CreatePost/>}/>
				<Route path="myArticles" element={<MyPosts/>}/>		    
				<Route path="article/:id" element={<EditPost/>} />
				<Route path="adminDeletePost/:id" element={<DeletePost/>} />

				<Route path='comments/:id' element={<Comments/>}/>
				<Route path='createComment/:id' element={<CreateComment/>}/>
				<Route path='deleteComment/:id' element={<AdminDeleteComment/>}/>
				<Route path='updateComment/:id' element={<EditComment/>}/>

				<Route path="contacts" element={<Contacts/>}/>
				<Route path="compte" element={<Count />} />
				<Route path="profil" element={<EditProfil/>} />
				<Route path="AdminDeleteProfil/:id" element={<AdminDeleteProfil/>} />
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