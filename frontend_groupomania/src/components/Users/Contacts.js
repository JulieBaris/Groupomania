import '../../styles/index.scss'
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"
//function pricipale

function GetAllUsers()
{
     let navigate = useNavigate();
     // Récupération du token et de l'id de l'utilisateur
     let userId = localStorage.getItem('userIsConnected');
     let token = "Bearer " + localStorage.getItem('accessToken');
     // Pour revenir au menu principal
     const routeDashbord = () =>
    {
        navigate('/dashbord')
    }
     
     function handleClick(event)
     {
         event.preventDefault();
     }
     
     const [users, setUsers] = useState(["{}"])

     //Pour récupérer les informations relatives à l'ensemble des utilisateurs inscrits
     useEffect(() => 
     {
          let endpoints = 'http://localhost:3300/api/profils'
          axios.get(endpoints,
               {headers: 
                    {
                         'Content-Type': 'application/json',
                         'Authorization': token
                    }
               })
          .then(res => 
               {
                    if(token !== null && userId !== null)
                    {
                         setUsers(res.data.users)
                         console.log(res.data.users)
                    }
                    else
                    {
                         alert("Veuillez vous connecter !")
                    }                    
               }
          )
          .catch(error => {console.log(error);})
     }, [token, userId])

     
     return ( 
          <div className="bloc-cards">
               <div className='bloc-btn-contact'>
                    <i className="fa-solid fa-circle-arrow-left" aria-label='retour' onClick={routeDashbord} tabIndex={0} name='retour' role="button"></i>
               </div>
          <div className='bloc-card-user'>
               <div className='bloc-contact'>
                    <h2 className="contact-h2">Annuaire</h2>
                    <form onSubmit={handleClick} name = "search-article" className='search' method="post">
                         <input className='search-input'
                         type="search"
                         name="search"
                         aria-label='rechercher'
                         tabIndex={0}
                         placeholder="ex : Thomas Dupont" />

                         <i className='btn-icone'
                         tabIndex={0} 
                         aria-label='envoyer'
                         class="fa-solid fa-magnifying-glass"
                         role="button"></i>
                    </form>
               </div>
               
               {users.map((user) => (
                    
                    <div key={user.id} className='card-user'>
                         <img src={user.imageUrl} alt={user.firstName} className='imageUser' />
                         <p className='identity'>{user.userName}</p>
                         <p className='identity'>{user.firstName} {user.lastName}</p>
                         <p className='identity'><i className="fa-solid fa-phone"></i> {user.phone}</p>
                    </div>
               ))}
               
          </div>
          </div>
     )
}
export default GetAllUsers