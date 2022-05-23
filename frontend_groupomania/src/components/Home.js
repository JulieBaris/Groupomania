import '../styles/index.scss'
import React, { useEffect, useState } from "react"
import axios from 'axios';

function Home()
{   
    // Récupération du token et de l'id de l'utilisateur
    let userId = localStorage.getItem('userIsConnected');
    let token = "Bearer " + localStorage.getItem('accessToken');

    // récupération des informations relatives au profil de l'utilisateur
    const [user, setUser] = useState(["{}"])
    useEffect(() => 
    {
        let endpoints = `http://localhost:3300/api/profil/${userId}`
        axios.get(endpoints, {headers: {"Authorization" : token}})
        .then(res =>
            {
                if(res.error || userId === null || token === null)
                {
                    alert(res.error, "Connectez-vous !")
                }
                else
                {
                    setUser(res.data)
                    //console.log(res.data)
                }
            }
        )
        .catch(error => { return(error, alert("Oups ! 😒 Vous n'êtes peut être plus connecté."));})
    }, [token,userId])
    

    return (
        <div className="bloc-home">
           <div className="bloc-profilUser">
            <div className='container-profilUser'>
                <div className='card-profilUser'>
                    <h2 className="home-h2">Home</h2>
                    {
                        <div key={user.id} className='card-profil'>
                            <img src={user.imageUrl} alt={user.firstName} className='image-profil' />
                            <p className='identity'>{user.userName}</p>
                            <p className='identity'>{user.firstName} {user.lastName}</p>
                            <p className='identity'><i className="fa-solid fa-phone"></i> {user.phone}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
        </div> 
    );
}

export default Home;

