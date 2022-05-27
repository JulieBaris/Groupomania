import '../../styles/index.scss'
import React, { useEffect, useState } from "react"
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios"


function AdminDeleteComment()
{
     // Récupération du token et de l'id de l'utilisateur
     let { token, adminId } = AuthApi();
     // permet de rediriger l'utilisateur vers la page /articles
     let navigate = useNavigate();
     function routeArticles() {navigate('/articles');}
     //Récupération de l'id dans l'url
     const {id} = useParams()
     // observe et gère l'état des données
     const [comment, setComment] = useState([])
     useEffectDeleteComment(id, token, adminId, setComment);
     // Pour supprimer le profil, au clic 
     function SubmitDelete()
     {
          // si l'administrateur est identifié
          if(adminId !== null)
          {
               // faire une requête DELETE auprès de l'API
               axios({
                         method: 'delete',
                         headers: {"Authorization" : token},
                         url: `http://localhost:3300/api/AdminDeleteComment/${id}`,
                         data: 
                         {
                              id : comment.id,
                              content: comment.id,
                              imageUrl : comment.imageUrl
                         }
               })
               .then(function () 
               {
                    alert("Le commentaire a été supprimé avec succès ! 👋")
                    navigate('/dashbord')
               })
               .catch(function (error) 
               {
                    alert(error.message, "Le commentaire n'a pas été supprimé ! 😒 ");
               });
          }
          else
          {
               alert(`Aïe 😒! Ce commentaire n'a pas pu être supprimé.`)
          }
     }
     //inserer dans le DOM
     const insertText = InserDOM(routeArticles, SubmitDelete)
     return insertText
}
 
export default AdminDeleteComment;
//____________________________________Utils___________________________//
function AuthApi() {
     let adminId = localStorage.getItem('adminIsConnected');
     let token = "Bearer " + localStorage.getItem('accessToken');
     return { token, adminId };
}

function useEffectDeleteComment(id, token, adminId, setComment) {
     useEffect(() => {
          let endpoints = `http://localhost:3300/api/comment/${id}`;
          axios.get(endpoints, { headers: { "Authorization": token } })
               .then(res => {
                    if (res.error || adminId === null || token === null) {
                         alert(res.error, "Connectez-vous !");
                    }

                    else {
                         setComment(res.data);
                         console.log(res.data);
                    }
               }
               )
               .catch(error => { return (error, alert("Oups ! 😒 Vous n'êtes peut être plus connecté.")); });
     }, [id, adminId, token, setComment]);
}

function InserDOM(routeArticles, SubmitDelete) {
     return <div className="bloc-comment">
          <div className='bloc-btn-comment'>
               <i className="fa-solid fa-circle-arrow-left"
                    aria-label='retour'
                    onClick={routeArticles}
                    tabIndex={0}
                    name='retour'
                    role="button"></i>
          </div>
          <h2 className='comment-h2'>Suppression du commentaire</h2>
          <div className='container-comment'>
               <div className='form-user'>
                    <button className='btn' onClick={SubmitDelete} tabIndex={0} aria-label='supprimer'>Supprimer ce commentaire</button>
               </div>
          </div>
     </div>;
}
