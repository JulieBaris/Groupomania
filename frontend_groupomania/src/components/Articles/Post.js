import '../../styles/index.scss'
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"
//function pricipale

function AllArticles()
{
     // Récupération du token
     const storage = localStorage.getItem('accessToken');
     let token = "Bearer " +  storage;
     //console.log(token)
    const userId = localStorage.getItem('userId')
    console.log(userId)

     //récupération de données relatives aux articles 
     const [posts, setPosts] = useState([{
          userId : "",
          title : "",
          content : "", 
          imageUrl : ""
     }])
     useEffect(() => {
          
          let endpoints = 'http://localhost:3300/api/articles'
          axios(endpoints, 
               {headers: {"Authorization" : token}}
               )
          .then(res => {
               if(userId !== undefined){
                     setPosts(res.data)
                     console.log(res.data)
               }
               else{
                    alert("Veuillez vous connecter !")
               }
              
          }
          )
          .catch(error => {console.log(error);})
     }, [token, userId])

     //envoi et récupération de données relatives aux utilisateurs
     // const [users, setUsers] = useState([]);
     // useEffect(() => {
     //      axios.get("http://localhost:3300/api/profils", 
     //          {headers: 
     //              {"Authorization" : token}
     //          })
     //          .then(
     //              (result) => {
     //                  setUsers(result.data);
     //              },
     //              (error) => {
     //                   console.log(error)
     //              }
     //          )
     //      }, [token])

     let navigate = useNavigate();
     //utilisation de RouteDashbord pour revenir au menu principal
     const routeDashbord = () =>
     {
          let path = '/dashbord';
          navigate(path)
     }
     const routeCreatePost = () =>
     {
          let path = '/createPost';
          navigate(path)
     }

     //utilisation de handleClick pour écouter les événements
     function handleClick(event)
     {
         event.preventDefault();
     }

    
    
     const routePutPost = () =>{
          let path = '/article';
          navigate(path)
      }
      
     // Function et const pour créer un commentaire, afficher les commentaires et modifier un commentaire
     const [formDataComment, setFormComment] = React.useState(
          {
              title: "",
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
                         title : formDataComment.title,
                         comment : formDataComment.comment
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
