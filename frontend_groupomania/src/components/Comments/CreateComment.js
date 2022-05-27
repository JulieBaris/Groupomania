import '../../styles/index.scss'
import React, {useState} from "react"
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios"

function CreateComment()
{
     // Récupération du token et de l'id de l'utilisateur
     let { userId, token } = AuthApi();
     // permet de récupérer l'id dans l'url
     let {id} = useParams()
     // permet de rediriger l'utilisateur vers la page /articles
     let navigate = useNavigate();
     function routeComments() { navigate(`/comments/${id}`);}
     //récupération de données relatives aux articles 
     const [comment, setComments] = useState([{}])
     // écouter les changements des valeurs des input lorsqu'un utilisateur écrit un commentaire
     function handleChangeComment(event) 
     {
          const {name, value, type, checked} = event.target
          setComments(prevsetComments => {
               return {
               ...prevsetComments,
               [name]: type === "checkbox" ? checked : value
               }
          })
     }
     function handleSubmitComment(event) { event.preventDefault()}
     function SubmitComment (event){
          
          // suppression des paramètres par défaut      
          event.preventDefault()
          // Si l'utilisateur n'est pas connecté
          if(userId === null && token === null)
          {
               alert('Vous devez vous connecter !')
          }
          // Si l'utilisateur est connecté
          else
          {
               // Si le formulaire est rempli, on publie le commentaire
               if(comment !== undefined)
               {
                    // Requête POST auprès de l'API pour enregistrer les données dans la BDD
                    axios
                    ({
                         method: 'post',
                         url: 'http://localhost:3300/api/comment',
                         headers: { 
                              'Content-Type': 'application/json',
                              'Authorization': token
                         },
                         data: 
                         {
                              UserId: userId,
                              PostId : id,
                              content : comment.content,
                              imageUrl: comment.imageUrl
                         }
                    })
                    .then(function (response) {
                         // S'il y a un problème
                         if(response.error || token === null || userId === null)
                         {
                              return(alert("Votre commentaire n'a pas pu être ajouté 🥺 !"), response.error) 
                         }
                         // Si la réponse correspond
                         else
                         {
                              return(alert("Le commentaire a été ajouté avec succès ! 👌 "),
                              navigate(`/comments/${id}`) )
                         }
                    })
                    .catch(function (error) 
                    {
                         return(alert("Oups, une erreur s'est produite !🥺"), error.message)
                    });
               }
          }    
     }
     //permet d'insérer le texte dans le DOM
     const inserText = InserDOM(routeComments, handleSubmitComment, handleChangeComment, comment, SubmitComment)
     return inserText
}
export default CreateComment


//____________________Utils____________________//
function AuthApi() {
     let userId = localStorage.getItem('userIsConnected');
     let token = "Bearer " + localStorage.getItem('accessToken');
     return { userId, token };
}

function InserDOM(routeComments, handleSubmitComment, handleChangeComment, comment, SubmitComment) {
     return <main className="bloc-cards-comment">
          <div className='bloc-comment'>
               <div className='bloc-btn-comment'>
                    <i className="fa-solid fa-circle-arrow-left"
                         aria-label='retour'
                         onClick={routeComments}
                         tabIndex={0}
                         name='retour'
                         role="button"></i>
               </div>
               <h2 className='comment-h2'>Commentez !</h2>
               <div className='bloc-input-comment'>
                    <form onSubmit={handleSubmitComment} className='form-comment'>
                         <textarea className='input-text-comment'
                              type="text"
                              placeholder="100 caractères max"
                              onChange={handleChangeComment}
                              name="content"
                              aria-label='content'
                              value={comment.content}
                              required={true}
                              tabIndex={0} />
                         {/* <input className='input-text-comment'
                              type="text"
                              placeholder="URL de l'image"
                              onChange={handleChangeComment}
                              name="imageUrl"
                              aria-label='imageUrl'
                              value={comment.imageUrl}
                              required={true}
                              tabIndex={0}
                         /> */}
                         <button className='btn-createComment' onClick={SubmitComment}>
                              Publier
                         </button>
                    </form>
               </div>
          </div>
     </main>;
}

