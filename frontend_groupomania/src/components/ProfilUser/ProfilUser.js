import '../../styles/index.scss'
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function ProfilUser(){
    let navigate = useNavigate();
   
    // Récupération du token et de l'id de l'utilisateur
    let userId = localStorage.getItem('userIsConnected');
    let token = "Bearer " + localStorage.getItem('accessToken');

    //RouteDashbord pour retourner au menu principal
    const routeDashbord = () =>
    {
        navigate('/dashbord')
    }

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
    
    // Au clic, on redirige l'utilisateur pour qu'il puisse modifier son profil
    function SubmitUser(event)
    {
        // suppression des paramètres par défaut      
        event.preventDefault()
        navigate("/profil")
    }
    function DeleteUser(event)
    {
       event.preventDefault()
       if(user !== undefined)
        {
            alert("le profil utilisateur a été supprimé. 👋")
            axios({
                    method: 'delete',
                    headers: {"Authorization" : token},
                    url: `http://localhost:3300/api/profil/${userId}`,
                    data: 
                    {
                        id: user.id,
                        userName: user.userName,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phone: user.phone, 
                        imageUrl : user.imageUrl
                    }
            })
            .then(function () {
                    // handle success
                navigate('/signup') 
                
                })
            .catch(function (error) {
                    // handle error
            alert(error.message);
            });
        }
        else
        {
            alert(`Aïe 😒! Votre profil n'a pas pu être supprimé.`)
        }

   }
        
    
    return (
        <div className="bloc-profilUser">
            <div className='bloc-btn-contact'>
                <button className='btn-return' onClick={routeDashbord}><i className="fa-solid fa-circle-arrow-left"></i></button>
            </div>
            <div className='container-profilUser'>
                <div className='card-profilUser'>
                    <h2 className='profilUser-h2'>Compte Utilisateur</h2>
                    <p className='trait'>___________________</p>
                    {
                        <div key={user.id} className='card-user'>
                            <img src={user.imageUrl} alt={user.firstName} className='imageUser' />
                            <p className='identity'>{user.userName}</p>
                            <p className='identity'>{user.firstName} {user.lastName}</p>
                            <p className='identity'><i className="fa-solid fa-phone"></i> {user.phone}</p>
                        </div>
                    }
                </div>
                <div className='form-user'>
                    <button className='btn' onClick={SubmitUser}>Mettre à jour</button>
                    <button className='btn' onClick={DeleteUser}>Supprimer mon profil</button> 
                </div>
            </div>
        </div>
    );
}
export default ProfilUser