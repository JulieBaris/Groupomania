import '../../styles/index.scss'
import React from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"


function EditPost(){

     // Récupération du token
     const storage = localStorage.getItem('accessToken');
     let token = "Bearer " +  storage;
     // permet de rediriger l'utilisateur vers la page /articles
     let navigate = useNavigate();
     const routeArticles = () =>
     {
        let path = '/articles';
        navigate(path)
     }
     //permet de récupérer l'id de l'utilisateur
     const userId = localStorage.getItem('userId')
     
     //permet d'observer l'état des données
     const [dataPost, setDataPost] = React.useState(
          {
              title: "",
              content:"",
              imageUrl:""
          } 
     )
     // écouter les changements des valeurs des input lorsqu'un utilisateur souhaite créer un post
     function ChangePost(event) {
          const {name, value, type, checked} = event.target
          setDataPost(prevDataPost => {
              return {
                  ...prevDataPost,
                  [name]: type === "checkbox" ? checked : value
              }
          })
     }
     
     function handleSubmitPost(event) 
     {
          event.preventDefault()
          // submitToApi(formData)
          console.log(dataPost)
     }
     //au clique de l'utilisateur, on vérifie son existence(id) et on lui permet de modifier son article
     function SubmitPost(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()

          if(userId !== undefined && dataPost !== undefined)
          {
               // let params = new URLSearchParams(document.location.search);
               // let id = params.get("id");
               axios
               ({
                    method: 'put',
                    url: `http://localhost:3300/api/article/1`,
                    headers: { 
                         'Content-Type': 'application/json',
                         'Authorization': token
                     },
                    data: 
                    {
                         title : dataPost.title,
                         content : dataPost.content,
                         imageUrl: dataPost.imageUrl
                    }
               })
               .then(function (response) 
               {
                    //Si la réponse ne correspond pas, une alerte s'affiche
                    if(response === undefined)
                    {
                         alert("L'article n'a pas été mis à jour !")
                    }
                    //Si la réponse correspond, une alerte s'affiche et l'utilisateur est redirigé vers la page d'article
                    else
                    {
                         alert("L'article a été mis à jour avec succès ! ");
                         navigate('/articles')
                    }
               })
               .catch(function (error) {
                    console.log(error)
                    alert("Tous les champs doivent être saisies !");
               });
          }
     }
     function DeletePost(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()

          if(dataPost !== undefined)
          {
               // let params = new URLSearchParams(document.location.search);
               // let id = params.get("id");
               axios
               ({
                    method: 'delete',
                    url: `http://localhost:3300/api/article/1`,
                    headers: { 
                         'Content-Type': 'application/json',
                         'Authorization': token
                     },
                    data: 
                    {
                         id: dataPost.id,
                         userId:dataPost.id,
                         title : dataPost.title,
                         content : dataPost.content,
                         imageUrl: dataPost.imageUrl
                    }
               })
               .then(function (response) {
                    // handle success
                    return(alert("L'article a été supprimé avec succès ! "),
                    navigate("/articles"))
                    
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
                                   placeholder="Titre... (50 caractères maximum)"
                                   onChange={ChangePost}
                                   name="title"
                                   value={dataPost.title}
                                   required={true}
                                   maxLength={50}
                              />
                              <textarea
                                   type="text"
                                   placeholder="Votre article ... (250 caractères maximum)"
                                   onChange={ChangePost}
                                   name="content"
                                   value={dataPost.content}
                                   required={true}
                                   maxLength={250}
                                   className='input-text-article'
                              />
                              <input 
                                   className = "input-form-box" 
                                   aria-describedby="Image"  
                                   name='imageUrl' 
                                   onChange = {ChangePost} 
                                   type="text" 
                                   placeholder="copier l'adresse de l'image" value={dataPost.imageUrl}
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
 