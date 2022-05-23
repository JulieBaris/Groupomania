import '../../styles/index.scss'
import React from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"


function EditPost(){

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
          console.log(dataPost)
     }
     //au clique de l'utilisateur, on vérifie son existence(id) et on lui permet de modifier son article
     function SubmitPost(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()

          if(userId !== undefined && token !== undefined && dataPost !== undefined)
          {
               // let params = new URLSearchParams(document.location.search);
               // let id = params.get("id");
               axios
               ({
                    method: 'put',
                    url: `http://localhost:3300/api/article/18`,
                    headers: { 
                         'Content-Type': 'application/json',
                         'Authorization': token
                     },
                    data: 
                    {
                         userId: dataPost.userId,
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
               <div className='bloc-btn-article'>
                    <i className="fa-solid fa-circle-arrow-left"
                    aria-label='retour'
                    onClick={routeArticles}
                    tabIndex={0}
                    name='retour'
                    role="button"></i>
               </div>     
               <div className='bloc-card-article'>
                    <div className='bloc-article'>
                         <h2 className='editPost-h2'>Mettre à jour votre article :</h2>
                         <legend>* Tous les champs sont obligatoires</legend>
                         <form onSubmit={handleSubmitPost} className='form-createPost'>
                              <input
                                   className = "input-form-box"
                                   type="text"
                                   placeholder="Titre... (50 caractères maximum)"
                                   onChange={ChangePost}
                                   name="title"
                                   value={dataPost.title}
                                   required={true}
                                   maxLength={50}
                                   tabIndex={0}
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
                                   tabIndex={0}
                              />
                              <input 
                                   className = "input-form-box"
                                   aria-describedby="image"
                                   aria-label='image' 
                                   name='imageUrl' 
                                   onChange = {ChangePost} 
                                   type="text" 
                                   placeholder="copier l'adresse de l'image"
                                   value={dataPost.imageUrl}
                                   tabIndex={0}
                              />
                              <button className='btn-createPost' onClick={SubmitPost} tabIndex={0} aria-label='envoyer'>
                                   Publier
                              </button>
                         </form>
                    </div>
                    <div className='bloc-article'>
                         <h2 className='editPost-h2'>Supprimer votre article :</h2>
                         <button className='btn-createPost' onClick={DeletePost} tabIndex={0} aria-label='supprimer'>
                              Supprimer
                         </button>
                    
                         
                    </div>
               </div>
          </div>
     );
 }
 
 export default EditPost;
 