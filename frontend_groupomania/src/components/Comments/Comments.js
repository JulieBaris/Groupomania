import '../../styles/index.scss'
import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios"

function Comments()
{
     // Récupération du token et de l'id de l'utilisateur
     let userId = localStorage.getItem('userIsConnected');
     let token = "Bearer " + localStorage.getItem('accessToken');
     // permet de rediriger l'utilisateur vers la page /articles
     let navigate = useNavigate();
     const routeArticles = () =>
     {
          let path = '/articles';
          navigate(path)
     }
     let {id} = useParams()
     // Options pour paramétrer la date
     let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
     //récupération de données relatives aux articles 
     const [comments, setComments] = useState([{
          UserId : userId,
          PostId : id,
          content: "",
          imageUrl:""
     }])
     // écouter les changements des valeurs des input lorsqu'un utilisateur écrit un commentaire
     function handleChangeComment(event) {
          const {name, value, type, checked} = event.target
          setComments(prevsetComments => {
              return {
                  ...prevsetComments,
                  [name]: type === "checkbox" ? checked : value
              }
          })
     }
     function handleSubmitComment(event) {
          event.preventDefault()
          // submitToApi(formData)
          console.log(comments)
          }
     useEffect (() => 
     {
          let endpoints = 'http://localhost:3300/api/comments'
          axios(endpoints,
               {headers: 
                    {
                         'Content-Type': 'application/json',
                         'Authorization': token
                    }
               },
               )
          .then(res => 
               {
                    if(token !== null && userId !== null)
                    {
                              setComments(res.data)
                              console.log(res.data)
                         
                         
                    }
                    else
                    {
                         alert("Veuillez vous connecter !")
                    }
               }
          )
          .catch(error => 
               {
                    //console.log(error.message);
                    alert(error,"La requête n'a pas pu aboutir");
               })
     }, [token, userId, id])

     function CreateComment (event){
          
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
               // Si le formulaire est rempli on publie le commentaire
               if(comments !== undefined)
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
                              content : "",
                              imageUrl: ""
                         }
                    })
                    .then(function (response) {
                        // S'il y a un problème
                         if(response.error)
                         {
                             return(alert("Votre commentaire n'a pas pu être ajouté 🥺 !"), response.error) 
                         }
                         // Si la réponse correspond
                         else
                         {
                              return(alert("Le commentaire a été ajouté avec succès ! 👌 "),
                              navigate('/articles') )
                         }
                    })
                    .catch(function (error) 
                    {
                         return(alert("Oups, une erreur s'est produite !🥺"), error.message)
                    });
               }
          }    

     }

    return (
     <main className="bloc-cards">
          <div className='bloc-card-article'>
               <div className='bloc-article'>
                    <h2 className='groupomania-h2'>Articles parus</h2>
                    <div className='bloc-btn-article'>
                         <i className="fa-solid fa-circle-arrow-left"
                              aria-label='retour'
                              onClick={routeArticles}
                              tabIndex={0}
                              name='retour'
                              role="button"></i>
                    </div>
               </div>
               {comments.map((comments) => (
                    <div key={comments.id} className='card-article' tabIndex={0}>
                         <time>{(new Date()).toLocaleDateString(options, comments.updatedAt, "en-FR")}</time>
                         <div className='container-article'>
                              <div className='container-edit'>
                                   {<div className='author-post'>
                                   {/* <img className='image-profil-post' src={comments.User.imageUrl} alt={comments.User.userName}></img> */}
                                   {/* <legend className='author'>{comments.User.userName}</legend> */}
                                   </div>}
                              </div>
                              <div className='container-edit'>
                                   <p className='article-post'>{comments.content}</p>
                              </div>    
                         </div>
                    </div>
               ))}
               <div className='connect'>
               
               <form onSubmit={handleSubmitComment} className='connect connect-cart'>
                    <input className='input-text-article'
                         type="text"
                         placeholder="Ajoute ton commentaire"
                         onChange={handleChangeComment}
                         name="content"
                         aria-label='content'
                         value={comments.content}
                         required={true}
                         tabIndex={0}
                    />
                    <input className='input-text-article'
                         type="text"
                         placeholder="Url de l'image"
                         onChange={handleChangeComment}
                         name="imageUrl"
                         aria-label='imageUrl'
                         value={comments.imageUrl}
                         required={true}
                         tabIndex={0}
                    />
                    <button className='btn-createPost' onClick={CreateComment}>
                         Publier
                    </button>
               </form>
          </div>
          </div>
     </main>)
}
 
export default Comments;