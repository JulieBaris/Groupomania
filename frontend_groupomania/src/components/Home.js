import '../styles/index.scss'

import React from 'react';
import {useNavigate} from "react-router-dom";

function Home(){

    //route change after checking for corporate discount
    let navigate = useNavigate();
    const routeAllUsers = () =>{
        let path = 'reseau';
        navigate(path)
    }

    const routeArticles = () =>{
        let path = 'articles';
        navigate(path)
    }

    const routeCountUser = () =>{
        let path = 'compte';
        navigate(path);
    }

    return (
        <div className="bloc-home">
           <h2>Home</h2>
            <div className='bloc-btn'>
                <button className='btn-home' onClick={routeAllUsers}><i className="fa-solid fa-address-book"></i>Réseau</button>
                <button className='btn-home' onClick={routeArticles}><i className="fa-solid fa-newspaper"></i>Articles</button>
                <button className='btn-home' onClick={routeCountUser}><i className="fa-solid fa-circle-user"></i>Compte</button>
            </div>

        </div>
    );
}

export default Home;

