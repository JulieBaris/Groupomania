import '../../styles/index.scss'
import React from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"
//function pricipale

function CreatePost()
{
     // Récupération du token
     const storage = localStorage.getItem('accessToken');
     let token = "Bearer " +  storage;
     //console.log(token)
     const userId = localStorage.getItem('userId')
     console.log(userId)

     let navigate = useNavigate();
     //utilisation de RouteDashbord pour revenir au menu principal
     const routeArticles = () =>
     {
          let path = '/articles';
          navigate(path)
     }

     //On récupère via axio les informations ou bien on les envoie (get/post)
     const [post, setPost] = React.useState(
          {
               id:"",
              title: "", 
              content: "", 
              imageUrl:""
          } 
     )
     // "handleChangePost" écoute les changements des valeurs des input lorsqu'un utilisateur souhaite créer un post
     function handleChangePost(event) {
          const {name, value, type, checked} = event.target
          setPost(prevPost => {
              return {
                  ...prevPost,
                  [name]: type === "checkbox" ? checked : value
              }
          })
     }
     function handleSubmitPost(event) {
          event.preventDefault()
          console.log(post)
          }
     // au clique sur le button "Publier", si l'utilisateur est connecté il a la possibilité de créer un article et de la publier 
     function SubmitPost(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()

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
                    data: 
                    {
                         id: post.id,
                         title : post.title,
                         content : post.content,
                         imageUrl: post.imageUrl
                    }
               })
               .then(function (response) {
                    // handle success
                    if(response.error){
                         alert("Votre article n'a pas pu être publié : " + response.error);
                    }
                    else{
                         localStorage.setItem("articleId", response.data.id)
                         return(alert("L'article a été créé avec succès ! "),
                         navigate('/articles') )
                    }
                  })
               .catch(function (error) {
                    // handle error
               alert(error.message);
               });
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
