import '../../styles/index.scss'
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"

function MyPosts()
{
     // Récupération du token et de l'id de l'utilisateur
     let userId = localStorage.getItem('userIsConnected');
     let token = "Bearer " + localStorage.getItem('accessToken');

     //récupération de données relatives aux articles 
     const [posts, setPosts] = useState([{
          userId:{userId},
          title : "",
          content : "", 
          imageUrl : ""
     }])
     const [user, setUser] = useState([{
          id : '', 
          userName:'', 
          firstName:'',
          lastName:'',
          imageUrl:''
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
                         console.log(res.data)
                         const getUserIdPost= res.data[1].userId
                         console.log(getUserIdPost)
                         if( getUserIdPost === userId)
                         {
                              setPosts(res.data)
                         }
                         else
                         {
                              alert("vous n'avez pas encore publié d'article ! Allez-y !")
                         }
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

     useEffect(() => 
     {
          let endpoints = `http://localhost:3300/api/profil/${userId}`
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
                         setUser(res.data)
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
                    console.log(error.message);
                    alert("Connectez-vous pour accéder à l'historique de vos articles.");
               })
     }, [token, userId])
     
     let navigate = useNavigate();
     //utilisation de RouteDashbord pour revenir à la page 'articles'
     const routeArticles = () =>
     {
          navigate('/articles')
     }
     
     // RoutePutPost pour modifier un post
     const routePutPost = () =>
     {
          navigate('/article/')          
     }
     
     const inserText = ( 
     <main className="bloc-cards">           
          <div className='bloc-card-article'>
               <div className='bloc-article'>
               <h2 className='groupomania-h2'>Mes articles</h2>
               <div className='bloc-btn-article'>
                    <i className="fa-solid fa-circle-arrow-left"
                    aria-label='retour'
                    onClick={routeArticles}
                    tabIndex={0}
                    name='modifier'
                    role="button"></i>
                    <button className='btn-createPost'
                    tabIndex={0}
                    name='modifier'
                    onClick={routePutPost}>
                         Modifier
                    </button>
               </div> 
          </div>
               {posts.map((post) => (
               <div key={post.id} className='card-myArticles' tabIndex={0}>
                    <img src={post.imageUrl} alt={post.title} className='imageArticle'/>
                    <div className='container-article'>
                         <div className='container-edit'>
                              <h3 className='article-title'>{post.title}</h3>
                              {
                              (<div key={user.id}>
                              <img className='image-profil-post' src={user.imageUrl} alt={user.userName}></img>
                              </div>)}
                         </div>
                         <div className='container-edit'>
                              <p className='article-post'>{post.content}</p>
                         </div>    
                         <div className='container-btn-icone'>
                              <i onClick={routePutPost} 
                              tabIndex={0}
                              aria-label="modifier"
                              className="fa-solid fa-pen-clip"
                              role="button"
                              name="modifier"></i>
                              <i tabIndex={0}
                              className="fa-solid fa-thumbs-up"
                              aria-label="j'aime" 
                              role="button"
                              name="j'aime"></i>
                              <i tabIndex={0}
                              className="fa-solid fa-thumbs-down"
                              aria-label="je n'aime pas"
                              role="button"
                              name="je n'aime pas"></i>
                         </div>      
                    </div>
               </div>
               ))}
          </div>
     </main>)
return inserText
}
export default MyPosts
