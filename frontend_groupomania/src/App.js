import Menu from './layout/app';
import Login from './components/Auth/Login'
import SignUp from "./components/Auth/SignUp";
import LoginAdmin from './components/Auth/LoginAmin';
import Home from './components/Home'
import GetAllUsers from './components/Users/Contacts';
import AdminDeleteProfil from './components/Users/AdminDeleteProfil';
import AllArticles from './components/Articles/Post';
import CreatePost from './components/Articles/CreatePost';
import MyPosts from './components/Articles/MyPosts';
import EditPost from './components/Articles/EditPost'
import DeletePost from './components/Articles/AdminDeletePost';
import ProfilUser from './components/ProfilUser/ProfilUser'
import EditProfil from "./components/ProfilUser/EditProfilUser";
import Comments from './components/Comments/Comments';
import CreateComment from './components/Comments/CreateComment';
import AdminDeleteComment from './components/Comments/DeleteComments';

import {BrowserRouter, Routes, Route } from 'react-router-dom';

function App(){
	return (        
	<BrowserRouter>            
		 <Routes>
			<Route path='/' element={<Menu />}>                 
				<Route path="login" element={<Login/>}/>
				<Route path="loginAdmin" element={<LoginAdmin />}/>
				<Route path="signup" element={<SignUp />}/>  

				<Route path="dashbord" element={<Home />}/>

				<Route path="articles" element={<AllArticles/>}/>
				<Route path="createPost" element={<CreatePost/>}/>
				<Route path="myArticles" element={<MyPosts/>}/>		    
				<Route path="article/:id" element={<EditPost/>} />
				<Route path="adminDeletePost/:id" element={<DeletePost/>} />

				<Route path='comments/:id' element={<Comments/>}/>
				<Route path='createComment/:id' element={<CreateComment/>}/>
				<Route path='deleteComment/:id' element={<AdminDeleteComment/>}/>

				<Route path="contacts" element={<GetAllUsers/>}/>
				<Route path="compte" element={<ProfilUser />} />
				<Route path="profil" element={<EditProfil/>} />
				<Route path="AdminDeleteProfil/:id" element={<AdminDeleteProfil/>} />
			</Route>		               
		</Routes>
	</BrowserRouter>
 );
}
export default App