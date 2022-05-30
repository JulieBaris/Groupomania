// Imports 
import '../../styles/index.scss'
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"

//function pricipale
function GetAllUsers()
{
     let navigate = useNavigate();
     // Récupération du token et de l'id de l'utilisateur
     let { token, userId, adminId} = AuthApi();
     // Pour revenir au menu principal
     const routeDashbord = () =>
    {
        navigate('/dashbord')
    }
     //récupération de données relatives aux profils des utilisateurs 
     const [users, setUsers] = useState(["{}"])

     //Pour récupérer les informations relatives à l'ensemble des utilisateurs inscrits
     useEffectAllUsers(token, userId, setUsers);
     // Const contenant le texte à insérer dans le DOM
     const inserText = InserDOM(routeDashbord, users, adminId, navigate)
     return inserText
}
export default GetAllUsers
function InserDOM(routeDashbord, users, adminId, navigate) {
     return <div className="bloc-cards">
          <div className='bloc-btn-contact'>
               <i className="fa-solid fa-circle-arrow-left" aria-label='retour' onClick={routeDashbord} tabIndex={0} name='retour' role="button"></i>
          </div>
          <div className='bloc-card-user'>
               <div className='bloc-contact'>
                    <h2 className="contact-h2">Annuaire</h2>
               </div>

               {users.map((user) => (

                    <div key={user.id} className='card-user'>
                         <img src={user.imageUrl} alt={user.firstName} className='imageUser' />
                         <p className='identity'>{user.userName}</p>
                         <p className='identity'>{user.firstName} {user.lastName}</p>
                         <p className='identity'><i className="fa-solid fa-phone"></i> {user.phone}</p>
                         <div className='container-btn-icone'>
                              {adminId && (<i className="fa-solid fa-trash-can"
                                   aria-label='supprimer compte'
                                   onClick={function () {
                                        let adminId = localStorage.getItem('adminIsConnected');
                                        if (adminId === null) {
                                             alert("Seul l'administration est autorisée à supprimer ce profil. Un signalement à faire ? Contactez-nous !");
                                        }
                                        else { navigate(`/AdminDeleteProfil/${user.id}`); }
                                   } }
                                   tabIndex={0}
                                   name='supprimer'
                                   role="button">
                              </i>)}
                         </div>
                    </div>
               ))}

          </div>
     </div>;
}

//________________________________________Utils_____________________________//

function useEffectAllUsers(token, userId, setUsers) {
     useEffect(() => {
          let endpoints = 'http://localhost:3300/api/profils';
          axios.get(endpoints,
               {
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': token
                    }
               })
               .then(res => {
                    if (token !== null && userId !== null) {
                         setUsers(res.data.users);
                         //console.log(res.data.users);
                    }

                    else {
                         alert("Veuillez vous connecter !");
                    }
               }
               )
               .catch(error => { console.log(error); });
     }, [token, userId, setUsers]);
}

function AuthApi() {
     let userId = localStorage.getItem('userIsConnected');
     let token = "Bearer " + localStorage.getItem('accessToken');
     let adminId = localStorage.getItem('adminIsConnected');
     return { token, userId, adminId };
}
