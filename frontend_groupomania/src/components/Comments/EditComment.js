import '../../styles/index.scss'
import React, { useState } from "react"
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios"


function EditComment(){

     // Récupération du token et de l'id de l'utilisateur
     let { userId, token } = AuthApi();
     //récupération de l'id de l'article grâce à userParams
     const {id} = useParams()
     // permet de rediriger l'utilisateur vers la page /articles
     let navigate = useNavigate();
     const routeArticles = () =>
     {
        let path = '/articles/';
        navigate(path)
     }
     //permet d'observer l'état des données
     const [commentUpdated, setCommentsUpdate] = useState()
     // écouter les changements des valeurs des input lorsqu'un utilisateur souhaite créer un post
     function ChangeComment(event) {
          const {name, value, type, checked} = event.target
          setCommentsUpdate(prevDataComment => {
              return {
                  ...prevDataComment,
                  [name]: type === "checkbox" ? checked : value
              }
          })
     }
     
     function handleSubmitComment(event) 
     {
          event.preventDefault()
          console.log(commentUpdated)
     }
     //au clic de l'utilisateur, on vérifie son existence(id) et on lui permet de modifier son article
     function SubmitComment(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()

          if(userId !== null && token !== null && commentUpdated !== undefined && commentUpdated.id === userId )
          {
               // Requête PUT auprès de l'API pour modifier les données stockées dans la BDD
               axios
               ({
                    method: 'put',
                    url: `http://localhost:3300/api/commentUpdated/${id}`,
                    headers: 
                    { 
                         'Content-Type': 'application/json',
                         'Authorization': token
                    },
                    data: 
                    {
                         content : commentUpdated.content,
                         imageUrl: commentUpdated.imageUrl
                    }
               })
               .then(function (response) 
               {
                    //Si la réponse ne correspond pas, une alerte s'affiche
                    if(response.data === null)
                    {
                         alert("Le commentaire n'a pas été mis à jour !")
                    }
                    //Si la réponse correspond, une alerte s'affiche et l'utilisateur est redirigé vers la page d'article
                    else
                    {
                         setCommentsUpdate(response.data)
                         //console.log(response.data)
                         alert("Le commentaire a été mis à jour avec succès ! ");
                         navigate('/articles')
                    }
               })
               .catch(function (error) {
                    //console.log(error)
                    alert("Tous les champs doivent être saisies !");
               });
          }
          else
          {
               alert("Vous n'êtes pas autorisé à modifier ce commentaire !")
          }
     }

     // Function DelePost permet de supprimer un post au clic de l'utilisateur
     function DeleteComment(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()
          // s'il y a un article on envoie la requête de suppression à l'API
          if(commentUpdated !== undefined)
          {
               axios
               ({
                    method: 'delete',
                    url: `http://localhost:3300/api/deleteComment/${id}`,
                    headers: 
                    { 
                         'Content-Type': 'application/json',
                         'Authorization': token
                    },
                    data: 
                    {
                         content : commentUpdated.content,
                         imageUrl: commentUpdated.imageUrl
                    }
               })
               .then(function (response) 
               {
                    console.log(response.message)
                    return(alert("Le commentaire a été supprimé avec succès ! "),
                    navigate("/articles"))
               })
               .catch(function (error) 
               {
                    alert(error.message, "Le commentaire n'a pas été supprimé.");
               });
          }
     }
     const inserText =  insertDOM(routeArticles, handleSubmitComment, ChangeComment, commentUpdated, SubmitComment, DeleteComment);
     return inserText
 }
 
 export default EditComment;
// Utils
function insertDOM(routeArticles, handleSubmitComment, ChangeComment, commentUpdated, SubmitComment, DeleteComment) {
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
                    <h2 className='editPost-h2'>Mettre à jour votre commentaire :</h2>
                    <legend>* Tous les champs sont obligatoires</legend>
                    <form onSubmit={handleSubmitComment} className='form-createPost'>
                         <textarea
                              type="text"
                              placeholder="100 caractères max)"
                              onChange={ChangeComment}
                              name="content"
                              value={commentUpdated.content}
                              required={true}
                              maxLength={250}
                              className='input-text-article'
                              tabIndex={0} />
                         {/* <input
                              className="input-form-box"
                              aria-describedby="image"
                              aria-label='image'
                              name='imageUrl'
                              onChange={ChangeComment}
                              type="text"
                              placeholder="copier l'URL de l'image"
                              value={commentUpdated.imageUrl}
                              tabIndex={0} /> */}
                         <button className='btn-createPost' onClick={SubmitComment} tabIndex={0} aria-label='envoyer'>
                              Publier
                         </button>
                    </form>
               </div>
               <div className='bloc-article'>
                    <h2 className='editPost-h2'>Supprimer votre commentaire :</h2>
                    <button className='btn-createPost' onClick={DeleteComment} tabIndex={0} aria-label='supprimer'>
                         Supprimer
                    </button>
               </div>
          </div>
     </div>;
}

function AuthApi() {
     let userId = localStorage.getItem('userIsConnected');
     let token = "Bearer " + localStorage.getItem('accessToken');
     return { userId, token };
}
 