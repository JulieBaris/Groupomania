import '../../styles/index.scss'
import React, { useEffect, useState } from "react"
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios"


function AdminDeleteProfil()
{
     let navigate = useNavigate();
     // Récupération du token et de l'id de l'utilisateur
     let adminId = localStorage.getItem('adminIsConnected');
     let token = "Bearer " + localStorage.getItem('accessToken');
 
     // Pour supprimer le profil, au clic 
     const {id} = useParams()
     console.log(id)
          const [user, setUser] = useState(["{}"])
          useEffect(() => 
          {
               let endpoints = `http://localhost:3300/api/profil/${id}`
               axios.get(endpoints, {headers: {"Authorization" : token}})
               .then(res =>
                    {
                         if(res.error || adminId === null || token === null)
                         {
                              alert(res.error, "Connectez-vous !")
                         }
                         else
                         {
                              setUser(res.data)
                              console.log(res.data)
                         }
                    }
               )
               .catch(error => { return(error, alert("Oups ! 😒 Vous n'êtes peut être plus connecté."));})
          }, [id, adminId, token])

          function SubmitDelete()
          {
               // si l'administrateur est identifié
               if(adminId !== null)
               {
                    // faire une requête DELETE auprès de l'API
                    axios({
                              method: 'delete',
                              headers: {"Authorization" : token},
                              url: `http://localhost:3300/api/AdminDeleteProfil/${id}`,
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
                    .then(function () 
                    {
                         alert("Le profil a été supprimé avec succès ! 👋")
                         navigate('/dashbord')
                    })
                    .catch(function (error) 
                    {
                         alert(error.message, "Le profil n'a pas été supprimé ! 😒 ");
                    });
               }
               else
               {
                    alert(`Aïe 😒! Ce profil n'a pas pu être supprimé.`)
               }
          }
     const insertText = (
         <div className="bloc-profilUser">
             <div className='container-profilUser'>
                 <div className='form-user'>
                     <button className='btn' onClick={SubmitDelete} tabIndex={0} aria-label='supprimer'>Supprimer ce profil</button> 
                 </div>
             </div>
         </div>
         )
 
     return insertText
}
 
export default AdminDeleteProfil;