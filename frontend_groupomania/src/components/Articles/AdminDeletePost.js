import '../../styles/index.scss'
import React from "react"
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios"


function DeletePost(){

     // Récupération du token et de l'id de l'utilisateur
     let { adminId, token } = AuthApi();
     //récupération de l'id de l'article grâce à userParams
     const {id} = useParams()
     // permet de rediriger l'utilisateur vers la page /articles
     let navigate = useNavigate();
     function routeArticles() {navigate('/dashbord')}
     // Function DelePost permet de supprimer un post au clic de l'utilisateur
     function DeletePost(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()
          // s'il y a un article on envoie la requête DELETE à l'API
          if(adminId !== null)
          {
               axios
               ({
                    method: 'delete',
                    url: `http://localhost:3300/api/AdminDeletePost/${id}`,
                    headers: 
                    { 
                         'Content-Type': 'application/json',
                         'Authorization': token
                    }
               })
               .then(function (response) 
               {
                  
                    return(alert("L'article a été supprimé avec succès ! "),
                    navigate("/articles"),
                    console.log(response.message))
               })
               .catch(function (error) 
               {
                    alert(error.message, "L'article n'a pas été supprimé.");
               });
          }
     }
     const inserText =  insertDOM(routeArticles, DeletePost);
     return inserText
 }
 
 export default DeletePost;

 // ___________________Utils_________________________//
function AuthApi() {
     let adminId = localStorage.getItem('adminIsConnected');
     let token = "Bearer " + localStorage.getItem('accessToken');
     return { adminId, token };
}
function insertDOM(routeArticles, DeletePost) {
     return <div className="bloc-cards">
          <div className='bloc-btn-article'>
               <i className="fa-solid fa-circle-arrow-left"
                    aria-label='retour'
                    onClick={routeArticles}
                    tabIndex={0}
                    name='retour'
                    role="button">
               </i>
          </div>
          <div className='bloc-card-article'>
               <div className='bloc-article'>
                    <h2 className='editPost-h2'>Supprimer l'article :</h2>
                    <button className='btn-createPost' onClick={DeletePost} tabIndex={0} aria-label='supprimer'>
                         Supprimer
                    </button>
               </div>
          </div>
     </div>;
}
