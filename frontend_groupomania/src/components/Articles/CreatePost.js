import '../../styles/index.scss'
import React from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"
function CreatePost()
{

     // Récupération de l'id de l'utilisateur et du token 
     const userId = localStorage.getItem('userIsConnected');
     console.log(userId)
     const token = "Bearer " + localStorage.getItem('accessToken')
     console.log(token)
     
     let navigate = useNavigate();
     //utilisation de RouteDashbord pour revenir au menu principal
     const routeArticles = () =>
     {
          let path = '/articles';
          navigate(path)
     }

     //On intègre l'userId 
     const [post, setPost] = React.useState(
          {
               userId : `${userId}`,
               title: "",
               content: "",
               imageUrl:""
          } 
     )
     // "handleChangePost" écoute les changements des valeurs des input du formulaire
     function handleChangePost(event) 
     {
          const {name, value, type, checked} = event.target
          setPost(prevPost => {
              return {
                  ...prevPost,
                  [name]: type === "checkbox" ? checked : value
              }
          })
     }
     function handleSubmitPost(event) 
     {
          event.preventDefault()
          console.log(post)
     }
     // au clique sur le button "Publier", si l'utilisateur est connecté il a la possibilité de créer un article et de la publier 
     function SubmitPost(event)
     {
          
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
               // Si le formulaire est rempli on publie l'article
               if(post !== undefined)
               {
                    axios
                    ({
                         method: 'post',
                         url: 'http://localhost:3300/api/article',
                         headers: { 
                              'Content-Type': 'application/json',
                              'Authorization': token
                         },
                         credentials: "include",
                         data: 
                         {
                              UserId: userId,
                              title : post.title,
                              content : post.content,
                              imageUrl: post.imageUrl
                         }
                    })
                    .then(function (response) {
                        // S'il y a un problème
                         if(response.error)
                         {
                             return(alert("Votre article n'a pas pu être publié 🥺 !"), response.error) 
                         }
                         // Si la réponse correspond
                         else
                         {
                              return(alert("L'article a été créé avec succès ! 👌 "),
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
              
          <div className="bloc-cards">
               <div className='bloc-btn-contact'>
                    <button className='btn-return' onClick={routeArticles}><i className="fa-solid fa-circle-arrow-left"></i></button>
               </div>
               
               <div className='bloc-card-article'>
               
                    <div className='bloc-article'>
                         <h2 className='groupomania-h2'>Créez un article :</h2>
                         <p className='trait'>______________</p>
                         <legend>* Tous les champs sont obligatoires</legend>
                    
                         <form onSubmit={handleSubmitPost} className='form-createPost'>
                              <input
                                   type="text"
                                   placeholder="Titre... (40 caractères maximum)"
                                   onChange={handleChangePost}
                                   name="title"
                                   value={post.title}
                                   required={true}
                                   maxLength={40}
                              />
                              <textarea
                                   type="text"
                                   placeholder="Votre article ... (350 caractères maximum)"
                                   onChange={handleChangePost}
                                   name="content"
                                   value={post.content}
                                   required={true}
                                   maxLength={350}
                                   className='input-text-article'
                              />
                              <input 
                                   className = "input-form-box" 
                                   aria-describedby="Image"  
                                   name='imageUrl' 
                                   onChange = {handleChangePost} 
                                   type="text" 
                                   placeholder="copier l'adresse de l'image" value={post.imageUrl}
                              />
                              
                              <button className='btn-createPost' onClick={SubmitPost}>
                                   Publier
                              </button>
                         </form>
                    </div>
               </div>
          </div>
     )
}
export default CreatePost