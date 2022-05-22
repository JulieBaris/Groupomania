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
                    <button className='btn-return' onClick={routeDashbord}><i className="fa-solid fa-circle-arrow-left"></i></button>
               </div>
               <h2 className='groupomania-h2'>Annuaire Groupomania</h2>
               <div className='bloc-contact'>
                    <form onSubmit={handleClick} name = "search-user" className='search' method="post">
                         <div className="input-container">
                              <input className='search-input' type="search" name="search" placeholder="ex : Thomas" />
                              <input className="submit-input" type="submit" name="submit" value='GO' />
                         </div>
                    </form>
               </div>
               
               <div className='bloc-card-user'>
                   
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