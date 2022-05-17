import '../styles/index.scss'
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"
//function pricipale

function AllArticles()
{
     let navigate = useNavigate();
     const routeDashbord = () =>{
        let path = '/dashbord';
        navigate(path)
    }
    function handleClick(event) 
    {
         event.preventDefault();
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
      function handleChangeCreatePost(event) {
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
               axios
               ({
                    method: 'post',
                    url: 'http://localhost:3300/api/article',
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
                    return(alert("L'article a été créé avec succès ! "),
                    window.location.reload())
                    
                  })
               .catch(function (error) {
                    // handle error
               alert(error.message);
               });
          }
     }

     // 
     const routePutPost = () =>{
          let path = '/edit-article/id';
          navigate(path)
      }

     const [posts, setPosts] = useState([])
     useEffect(() => {
          
          let endpoints = 'http://localhost:3300/api/articles'
          axios.get(endpoints)
          .then(res => {
               setPosts(res.data)
          }
          )
          .catch(error => {console.log(error);})
     }, [])


     // Function et const pour créer un commentaire, afficher les commentaires et modifier un commentaire
     const [formDataComment, setFormComment] = React.useState(
          {
               id:"",
              firstName: "", 
              lastName: "",
              object: "",
              comment:""
          } 
     )
      // écouter les changements des valeurs des input lorsqu'un utilisateur souhaite créer un commentaire
      function handleChangeCreateComment(event) {
          const {name, value, type, checked} = event.target
          setFormComment(prevFormDataComment => {
              return {
                  ...prevFormDataComment,
                  [name]: type === "checkbox" ? checked : value
              }
          })
     }
     function handleSubmitComment(event) {
          event.preventDefault()
          // submitToApi(formData)
          console.log(formDataComment)
          }
     // au clique, lorsqu'un utilisateur commente un article, on vérifie son existence et on lui permet ou non de publier le commentaire
     function SubmitComment(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()

          if(formDataComment !== undefined)
          {
               axios
               ({
                    method: 'post',
                    url: 'http://localhost:3300/api/comment',
                    data: 
                    {
                         firstName : formDataComment.firstName,
                         lastName : formDataComment.lastName,
                         object: formDataComment.object,
                         comment: formDataComment.comment
                    }
               })
               .then(function (response) {
                    // handle success
                    return(alert("Le commentaire a été créé avec succès ! "),
                    window.location.reload())
                    
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
                    <button className='btn-return' onClick={routeDashbord}><i className="fa-solid fa-circle-arrow-left"></i></button>
               </div>
               
               <div className='bloc-card-article'>
               
               <div className='bloc-article'>
                    <h2 className='groupomania-h2'>Créez un article :</h2>
                    <p className='trait'>______________</p>
                    <legend>* Tous les champs sont obligatoires</legend>
               
                    <form onSubmit={handleSubmitPost} className='form-createPost'>
                         <input
                              type="text"
                              placeholder="Prénom"
                              onChange={handleChangeCreatePost}
                              name="firstName"
                              value={formDataPost.firstName}
                              required={true}
                         />
                         <input
                              type="text"
                              placeholder="Nom"
                              onChange={handleChangeCreatePost}
                              name="lastName"
                              value={formDataPost.lastName}
                              required={true}
                         />
                         <input
                              type="text"
                              placeholder="Titre... (50 caractères maximum)"
                              onChange={handleChangeCreatePost}
                              name="object"
                              value={formDataPost.object}
                              required={true}
                              maxLength={50}
                         />
                         <textarea
                              type="text"
                              placeholder="Votre article ... (250 caractères maximum)"
                              onChange={handleChangeCreatePost}
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
                              onChange = {handleChangeCreatePost} 
                              type="text" 
                              placeholder="copier l'adresse de l'image" value={formDataPost.imageUrl}
                         />
                         
                         <button className='btn-createPost' onClick={SubmitPost}>
                              Publier
                         </button>
                    </form>
               
                   <h2 className='groupomania-h2'>Articles parus</h2>
                   <p className='trait'>______________</p>               
                    <form onSubmit={handleClick} name = "search-article" className='search' method="post">
                         <div className="input-container">
                              <input className='search-input' type="search" name="search" placeholder="ex : Ecologie" />
                              <input className="submit-input" type="submit" name="submit" value='GO' />
                         </div>
                    </form>
               </div>
                    {posts.map((post) => (
                         
                         <div key={post.id} className='card-article'>
                              <img src={post.imageUrl} alt={post.firstName} className='imageArticle' />
                              <div className='container-article'>
                                   <div className='container-edit'>
                                        <h3 className='article-title'>{post.firstName} {post.lastName}</h3>
                                   </div>
                                   <div className='container-edit'>
                                        <p className='article-object'>{post.object}</p>
                                   </div>
                                   <div className='container-edit'>
                                        <p className='article-post'>{post.article}</p>
                                   </div>
                                   <div className='container-btn-icone'>
                                        <button className='btn-icone' onClick={routePutPost}><i className="fa-solid fa-pen-clip"></i></button>
                                        <button className='btn-icone'><i className="fa-solid fa-thumbs-up"></i></button>
                                        <button className='btn-icone'><i className="fa-solid fa-thumbs-down"></i></button>
                                   </div>
                              </div>
                              <div>
                                   <form onSubmit={handleSubmitComment} className='form-createComment'>
                                        <textarea
                                             type="text"
                                             placeholder="Votre commentaire ... (250 caractères maximum)"
                                             onChange={handleChangeCreateComment}
                                             name="comment"
                                             value={formDataComment.comment}
                                             required={true}
                                             maxLength={250}
                                             className='input-text-comment'
                                        />
                                        <button className='btn-createPost' onClick={SubmitComment}>
                                             Commenter
                                        </button>
                                   </form>
                              </div>
                         </div>
                         
                    ))}
                    
                    
               </div>
          </div>
     )
}
export default AllArticles
