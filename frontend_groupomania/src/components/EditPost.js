import '../styles/index.scss'
import React from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"


function EditPost(){
     let navigate = useNavigate();
     const routeArticles = () =>{
        let path = '/dashbord/articles';
        navigate(path)
    }
     const [formDataPost, setFormDataPost] = React.useState(
          {
              firstName: "", 
              lastName: "",
              object: "",
              article:"",
              imageUrl:""
          } 
     )
      // écouter les changements des valeurs des input lorsqu'un utilisateur souhaite créer un post
      function handleChangePutPost(event) {
          const {name, value, type, checked} = event.target
          setFormDataPost(prevFormDataPost => {
              return {
                  ...prevFormDataPost,
                  [name]: type === "checkbox" ? checked : value
              }
          })
     }
     function handleSubmitPost(event) {
          event.preventDefault()
          // submitToApi(formData)
          console.log(formDataPost)
          }
     // au clique, lorsqu'un utilisateur se connecte, on vérifie son existence et on lui permet ou non l'accès à son compte
     function SubmitPost(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()

          if(formDataPost !== undefined)
          {
               // let params = new URLSearchParams(document.location.search);
               // let id = params.get("id");
               axios
               ({
                    method: 'put',
                    url: `http://localhost:3300/api/article/14`,
                    data: 
                    {
                         firstName : formDataPost.firstName,
                         lastName : formDataPost.lastName,
                         object: formDataPost.object,
                         article: formDataPost.article,
                         imageUrl: formDataPost.imageUrl,
                         like: formDataPost.like,
                         dislike: formDataPost.dislike,
                    }
               })
               .then(function (response) {
                    // handle success
                    return(alert("L'article a été mis à jour avec succès ! "),
                    navigate("/dashbord/articles"))
                    
                  })
               .catch(function (error) {
                    // handle error
               alert(error.message);
               });
          }
     }
     function DeletePost(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()

          if(formDataPost !== undefined)
          {
               // let params = new URLSearchParams(document.location.search);
               // let id = params.get("id");
               axios
               ({
                    method: 'delete',
                    url: `http://localhost:3300/api/article/14`,
                    data: 
                    {
                         id: formDataPost.id,
                         firstName : formDataPost.firstName,
                         lastName : formDataPost.lastName,
                         object: formDataPost.object,
                         article: formDataPost.article,
                         imageUrl: formDataPost.imageUrl,
                         like: formDataPost.like,
                         dislike: formDataPost.dislike,
                    }
               })
               .then(function (response) {
                    // handle success
                    return(alert("L'article a été supprimé avec succès ! "),
                    navigate("/dashbord/articles"))
                    
                  })
               .catch(function (error) {
                    // handle error
               alert(error.message);
               });
          }
     }

     //route change after checking for corporate discount
     
     return (
          <div className="bloc-cards">
               <div className='bloc-btn-contact'>
                    <button className='btn-return' onClick={routeArticles}><i className="fa-solid fa-circle-arrow-left"></i></button>
               </div>
               
               <div className='bloc-card-article'>
               
                    <div className='bloc-article'>
                         <h2 className='editPost-h2'>Mettre à jour votre article :</h2>
                         <p className='trait'>___________________________</p>
                         <legend>* Tous les champs sont obligatoires</legend>
                    
                         <form onSubmit={handleSubmitPost} className='form-createPost'>
                              <input
                                   type="text"
                                   placeholder="Prénom"
                                   onChange={handleChangePutPost}
                                   name="firstName"
                                   value={formDataPost.firstName}
                                   required={true}
                              />
                              <input
                                   type="text"
                                   placeholder="Nom"
                                   onChange={handleChangePutPost}
                                   name="lastName"
                                   value={formDataPost.lastName}
                                   required={true}
                              />
                              <input
                                   type="text"
                                   placeholder="Titre... (50 caractères maximum)"
                                   onChange={handleChangePutPost}
                                   name="object"
                                   value={formDataPost.object}
                                   required={true}
                                   maxLength={50}
                              />
                              <textarea
                                   type="text"
                                   placeholder="Votre article ... (250 caractères maximum)"
                                   onChange={handleChangePutPost}
                                   name="article"
                                   value={formDataPost.article}
                                   required={true}
                                   maxLength={250}
                                   className='input-text-article'
                              />
                              <input 
                                   className = "input-form-box" 
                                   aria-describedby="Image"  
                                   name='imageUrl' 
                                   onChange = {handleChangePutPost} 
                                   type="text" 
                                   placeholder="copier l'adresse de l'image" value={formDataPost.imageUrl}
                              />
                              <button className='btn-createPost' onClick={SubmitPost}>
                                   Publier
                              </button>
                         </form>
                    </div>
                    <div className='bloc-article'>
                         <h2 className='editPost-h2'>Supprimer votre article :</h2>
                         <p className='trait'>_________________________</p>
                         <button className='btn-createPost' onClick={DeletePost}>
                              Supprimer
                         </button>
                    
                         
                    </div>
               </div>
          </div>
     );
 }
 
 export default EditPost;
 