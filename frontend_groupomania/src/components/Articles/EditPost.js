import '../../styles/index.scss'
import React, { useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios"


function EditPost(){

     // Récupération du token et de l'id de l'utilisateur
     let { userId, token } = AuthApi();
     //récupération de l'id de l'article grâce à userParams
     const {id} = useParams()
     // permet de rediriger l'utilisateur vers la page /articles
     let navigate = useNavigate();
     function routeArticles() { navigate('/myArticles')}
     //permet d'observer l'état des données
     const [postUpdated, setpostUpdated] = useStatePost()
     const [post, setPost] = useStatePost(["{}"])
     // écouter les changements des valeurs des input lorsqu'un utilisateur souhaite créer un post
     function ChangePost(event) {
          const {name, value, type, checked} = event.target
          setpostUpdated(prevDataPost => {
              return {
                  ...prevDataPost,
                  [name]: type === "checkbox" ? checked : value
              }
          })
     }
     
     function handleSubmitPost(event) {event.preventDefault()}
     //au clic de l'utilisateur, on vérifie son existence et on lui permet de modifier son article
     
          // suppression des paramètres par défaut      
      

          useEffect(() => {
               let endpoints = `http://localhost:3300/api/article/${id}`;
               axios.get(endpoints,
                    {
                         headers: {
                              'Content-Type': 'application/json',
                              'Authorization': token
                         }
                    }
               )
                    .then(res => {
                         if (token !== null || userId !== null) {
                              setPost(res.data);
                              console.log(res.data)
                         }
     
                         else {
                              alert("Veuillez vous connecter !");
                         }
                    }
                    )
                    .catch(error => {
                         //console.log(error.message);
                         alert(error, "La requête n'a pas pu aboutir");
                    });
          }, [id, setPost,userId,token]);
     
     function SubmitPost(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()

          if(userId !== undefined && token !== undefined && postUpdated !== undefined)
          {
               // Requête PUT auprès de l'API pour modifier les données stockées dans la BDD
               axios
               ({
                    method: 'put',
                    url: `http://localhost:3300/api/article/${id}`,
                    headers: 
                    { 
                         'Content-Type': 'application/json',
                         'Authorization': token
                    },
                    data: 
                    {
                         title : postUpdated.title,
                         content : postUpdated.content,
                         imageUrl: postUpdated.imageUrl
                    }
               })
               .then(function (response) 
               {
                    //Si la réponse ne correspond pas, une alerte s'affiche
                    if(response.data === null)
                    {
                         alert("L'article n'a pas été mis à jour !")
                    }
                    //Si la réponse correspond, une alerte s'affiche et l'utilisateur est redirigé vers la page d'article
                    else
                    {
                         setpostUpdated(response.data)
                         alert("L'article a été mis à jour avec succès ! ");
                         navigate('/articles')
                    }
               })
               .catch(function (error) {
                    alert("Tous les champs doivent être saisies !", error);
               });
          }
          else
          {
               alert("Une erreur s'est produite.")
          }
     }

     // Function DelePost permet de supprimer un post au clic de l'utilisateur
     function DeletePost(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()
          // s'il y a un article on envoie la requête de suppression à l'API
          if(postUpdated !== undefined)
          {
               axios
               ({
                    method: 'delete',
                    url: `http://localhost:3300/api/article/${id}`,
                    headers: 
                    { 
                         'Content-Type': 'application/json',
                         'Authorization': token
                    },
                    data: 
                    {
                         title : postUpdated.title,
                         content : postUpdated.content,
                         imageUrl: postUpdated.imageUrl
                    }
               })
               .then(function (response) 
               {
                    console.log(response.message)
                    return(alert("L'article a été supprimé avec succès ! "),
                    navigate("/articles"))
               })
               .catch(function (error) 
               {
                    alert(error.message, "L'article n'a pas été supprimé.");
               });
          }
     }
     let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
     const inserText =  
     (<div className="bloc-cards">
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
               <h2 className='editPost-h2'>Mettre à jour votre article :</h2>
               <legend>* Tous les champs sont obligatoires</legend>               
               <div className='bloc-editArticle'>
                    {<div key={post.id} className='card-editArticle' tabIndex={0}>
                         <img src={post.imageUrl} alt={post.title} className='imageArticle' />
                         <time>{(new Date()).toLocaleDateString(options, post.updatedAt, "en-FR")}</time>
                         <div className='container-article'>
                              <div className='container-edit'>
                                   <h3 className='article-title'>{post.title}</h3>
                              </div>
                              <div className='container-edit'>
                                   <p className='article-post'>{post.content}</p>
                              </div>
                         </div>
                         <i className="fa-solid fa-trash-can"
                              aria-label='supprimer article'
                              onClick={DeletePost}
                              tabIndex={0}
                              name='supprimer'
                              role="button">      
                         </i>
                    </div>}
                    <form onSubmit={handleSubmitPost} className='form-ediPost'>
                         <input
                              className="input-form-box"
                              type="text"
                              placeholder="Titre... (50 caractères maximum)"
                              onChange={ChangePost}
                              name="title"
                              value={postUpdated.title}
                              required={true}
                              maxLength={50}
                              tabIndex={0} />
                         <textarea
                              type="text"
                              placeholder="Votre article ... (250 caractères maximum)"
                              onChange={ChangePost}
                              name="content"
                              value={postUpdated.content}
                              required={true}
                              maxLength={250}
                              className='input-text-article'
                              tabIndex={0} />
                         <input
                              className="input-form-box"
                              aria-describedby="image"
                              aria-label='image'
                              name='imageUrl'
                              onChange={ChangePost}
                              type="text"
                              placeholder="copier l'URL de l'image"
                              value={postUpdated.imageUrl}
                              tabIndex={0} />
                         <button className='btn-createPost' onClick={SubmitPost} tabIndex={1} name='envoyer' aria-label='envoyer'>
                              Modifier
                         </button>
                    </form>
               </div>
          </div>
          <div className='bloc-article'>
               <h2 className='editPost-h2'>Supprimer votre article :</h2>
               <button className='btn-createPost' onClick={DeletePost} tabIndex={0} aria-label='supprimer'>
                    Supprimer
               </button>
          </div>
     </div>
</div>);
     return inserText
     // Options pour paramétrer la date
     
 }
 
 export default EditPost;
// ___________________Utils_____________________________//


function useStatePost() {
     return React.useState(
          {
               id: '',
               title: "",
               content: "",
               imageUrl: ""
          }
     );
}
function AuthApi() {
     let userId = localStorage.getItem('userIsConnected');
     let token = "Bearer " + localStorage.getItem('accessToken');
     return { userId, token };
}
 