import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route,} from "react-router-dom";
//import { createRoot } from 'react-dom/client';

import './styles/index.scss'

import App from './App'
import Login from './webpages/login'
import SignUp from "./webpages/signup";
import Dashbord from './webpages/dashbord.js'
import Profil from './webpages/profilUser'

//const container = ;
const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render(
<BrowserRouter>
	<Routes>
		<Route path="/" element={<App />}>
			<Route path="login" element={<Login />} />
			<Route path="signup" element={<SignUp />} />
			<Route path="dashbord" element={<Dashbord />} />
			<Route path="profil" element={<Profil />} />
		</Route>
	</Routes>
</BrowserRouter>)