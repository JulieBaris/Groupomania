import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
//import { createRoot } from 'react-dom/client';

import './styles/index.scss'

import App from './App'
import Login from './webpages/login'
import SignUp from "./webpages/signup";
import Dashbord from './webpages/dashbord.js'
import Reseau from './webpages/reseau'
import Articles from './webpages/articles'
import Count from './webpages/profilUser'

//const container = ;
const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render(
<BrowserRouter>
	<Routes>
		<Route path="/" element={<App />}>
			<Route path="login" element={<Login />}/>
			<Route path="signup" element={<SignUp />}/>
			<Route path="dashbord" element={<Dashbord />}/>
				<Route path="dashbord/reseau" element={<Reseau />} />
				<Route path="dashbord/articles" element={<Articles/>} />
				<Route path="dashbord/compte" element={<Count />} />
			</Route>			
	</Routes>
</BrowserRouter>)