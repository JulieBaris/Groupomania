import '../../styles/index.scss'
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function ProfilUser()
{

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
              
            <div className='container-profilUser'>
                <div className='card-profilUser'>
                    <h2 className='profilUser-h2'>Compte Utilisateur</h2>
                    <div className='bloc-btn-profil'>
                        <i className="fa-solid fa-circle-arrow-left"
                        aria-label='retour'
                        onClick={routeDashbord}
                        tabIndex={0}
                        name='retour'
                        role="button"></i>
                        <i class="fa-solid fa-gear"
                        aria-label='modifier compte'
                        onClick={SubmitUser}
                        tabIndex={0}
                        name='modifier'
                        role="button"></i>
                        <i class="fa-solid fa-trash-can"
                        aria-label='supprimer compte'
                        onClick={DeleteUser}
                        tabIndex={0}
                        name='supprimer'
                        role="button"></i>
                    </div>       
                    {
                        <div key={user.id} className='card-profil'>
                            <img src={user.imageUrl} alt={user.firstName} className='image-profil' />
                            <p className='identity'>{user.userName}</p>
                            <p className='identity'>{user.firstName} {user.lastName}</p>
                            <p className='identity'><i className="fa-solid fa-phone"></i> {user.phone}</p>
                        </div>
                    }
                </div>
                <div className='form-user'>
                    <button className='btn' onClick={SubmitUser} tabIndex={0} aria-label='modifier'>Mettre à jour</button>
                    <button className='btn' onClick={DeleteUser} tabIndex={0} aria-label='supprimer'>Supprimer mon profil</button> 
                </div>
            </div>
        </div>
    );
}
export default ProfilUser