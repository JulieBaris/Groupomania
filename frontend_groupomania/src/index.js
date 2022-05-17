import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
//import { createRoot } from 'react-dom/client';

import './styles/index.scss'

import App from './App'
import Login from './webpages/login'
import SignUp from "./webpages/signup";
import Dashbord from './webpages/dashbord.js'
import Contacts from './webpages/contacts'
import Articles from './webpages/articles'
import EditPost from './components/EditPost'
import Count from './webpages/profilUser'
import EditProfil from "./components/EditProfilUser";

//const container = ;
const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render(
<BrowserRouter>
	<Routes>
		<Route path="/" element={<App />}>
			<Route path="login" element={<Login />}/>
			<Route path="signup" element={<SignUp />}/>
			<Route path="dashbord" element={<Dashbord />}/>
				<Route path="dashbord/contacts" element={<Contacts />} />
				<Route path="dashbord/articles" element={<Articles/>} />
				<Route path="edit-article/id" element={<EditPost/>} />
				<Route path="dashbord/compte/id" element={<Count />} />
				<Route path="edit-profil/id" element={<EditProfil/>} />
			</Route>			
	</Routes>
</BrowserRouter>)