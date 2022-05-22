import '../../styles/index.scss'
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"
//function pricipale

function AllArticles()
{
     // Récupération du token et de l'id de l'utilisateur
     let userId = localStorage.getItem('userIsConnected');
     let token = "Bearer " + localStorage.getItem('accessToken');

     //récupération de données relatives aux articles 
     const [posts, setPosts] = useState([{
          title : "",
          content : "", 
          imageUrl : ""
     }])

     useEffect(() => 
     {
          let endpoints = 'http://localhost:3300/api/articles/'
          axios(endpoints,
               {headers: 
                    {
                         'Content-Type': 'application/json',
                         'Authorization': token
                    }
               }
               )
          .then(res => 
               {
                    if(token !== null && userId !== null)
                    {
                         setPosts(res.data)
                         console.log(res.data)
                    }
                    else{
                         alert("Veuillez vous connecter !")
                    }
               }
          )
          .catch(error => 
               {
                    console.log(error.message);
                    alert('Connectez-vous pour accéder aux articles publiés.');
               })
     }, [token, userId])
     
     let navigate = useNavigate();
     //utilisation de RouteDashbord pour revenir au menu principal
     const routeDashbord = () =>
     {
          navigate('/dashbord')
     }
     //utilisation de RouteCreatePost pour créer un post
     const routeCreatePost = () =>
     {
          navigate('/createPost')
     }
     // RoutePutPost pour modifier un post
     const routePutPost = () =>
     {
          navigate('/article')
     }
     //utilisation de handleClick pour écouter les événements
     function handleClick(event)
     {
         event.preventDefault();
     }
    

     // Function et const pour créer un commentaire, afficher les commentaires et modifier un commentaire
     const [comment, setComment] = React.useState(
          {
               userId:`${userId}`,
               postId: `${posts.id}`,
               content:""
          } 
     )
     // écouter les changements des valeurs des input lorsqu'un utilisateur souhaite créer un commentaire
     function handleChangeComment(event)
     {
          const {name, value, type, checked} = event.target
          setComment(prevFormComment => 
               {
                    return {
                         ...prevFormComment,
                         [name]: type === "checkbox" ? checked : value
                    }
               })
     }
     function handleSubmitComment(event) 
     {
          event.preventDefault()
          console.log(comment)
     }
     // Au clic, on permet à l'utilisateur connecté de publier un commentaire
     function SubmitComment(event)
     {  
          event.preventDefault()
          if(userId === null && token === null)
          {
               alert('Vous devez vous connecter !')
          }
          else
          {
               if(comment !== undefined)
               {
                    axios
                    ({
                         method: 'post',
                         url: 'http://localhost:3300/api/comment',
                         headers: 
                         {
                              'Content-Type': 'application/json',
                              'Authorization': token
                         },
                         data:
                         {
                              UserId: userId,
                              PostId: posts.id,
                              content : comment.content
                         }
                    })
                    .then(function (response)
                    {
                         if(response.error)
                         {
                              return (
                                   console.log(response.error),
                                   alert("Votre commentaire n'a pas pu être publié ! 😭")
                              )
                         }
                         // Si la réponse correspond
                         else
                         {
                              return(
                                   alert("Le commentaire a été créé avec succès ! 👌"),
                                   window.location.reload()
                                   )
                         }
                    })
                    .catch(function (error) 
                    {
                         return(
                              console.log(error.message),
                              alert("Le commentaire n'a pas été créé !🥺")
                         )
                    });
               }
          }          
     }
     
     return ( 
              
          <div className="bloc-cards">
               <div className='bloc-btn-article'>
                    <button className='btn-return' onClick={routeDashbord}><i className="fa-solid fa-circle-arrow-left"></i></button>
                    <button className='btn-createPost' onClick={routeCreatePost}>Créez un article</button>
                    <button className='btn-createPost' onClick={routeCreatePost}>Tous vos articles</button>
               </div>               
               <div className='bloc-card-article'>
               
               <div className='bloc-article'>
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
                              <img src={post.imageUrl} alt={post.title} className='imageArticle' />
                              <div className='container-article'>
                                   <div className='container-edit'>
                                        <h3 className='article-title'>{post.title}</h3>
                                   </div>
                                   <div className='container-edit'>
                                        <p className='article-post'>{post.content}</p>
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
                                             onChange={handleChangeComment}
                                             name="content"
                                             value={comment.content}
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
