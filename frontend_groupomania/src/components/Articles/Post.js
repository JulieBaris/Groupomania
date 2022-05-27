import '../../styles/index.scss'
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"

function AllArticles()
{
     let navigate = useNavigate();
     // Récupération du token et de l'id de l'utilisateur
     let { token, userId } = AuthApi();
     //récupération de données relatives aux articles 
     const [posts, setPosts] = useState([])
     useEffectGetAllPosts(token, userId, setPosts);
     
     //utilisation de Routes qui contient toutes les routes
     const { routeDashbord, routeCreatePost, routeMyArticles } = Routes(navigate);
    
     // Options pour paramétrer la date
     let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};

     //Insérer dans le DOM
     const inserText =InserDOM(routeDashbord, routeCreatePost, routeMyArticles, posts, options, navigate)
     return inserText
}
export default AllArticles

//_________________________________________Utils____________________________//

function InserDOM(routeDashbord, routeCreatePost, routeMyArticles, posts, options, navigate) {
     return <main className="bloc-cards">
          <div className='bloc-card-article'>
               <div className='bloc-article'>
                    <h2 className='groupomania-h2'>Articles parus</h2>
                    <div className='bloc-btn-article'>
                         <i className="fa-solid fa-circle-arrow-left"
                              aria-label='retour'
                              onClick={routeDashbord}
                              tabIndex={0}
                              name='retour'
                              role="button"></i>
                         <button className='btn-createPost'
                              tabIndex={0}
                              name='créer'
                              onClick={routeCreatePost}>
                              Publier
                         </button>
                         <button className='btn-createPost'
                              tabIndex={0}
                              name='mes articles'
                              onClick={routeMyArticles}>
                              Mes articles
                         </button>
                    </div>
               </div>
               {posts.map((post) => (
                    <div key={post.id} className='card-article' tabIndex={0}>
                         <img src={post.imageUrl} alt={post.title} className='imageArticle' />

                         <time>{(new Date()).toLocaleDateString(options, post.updatedAt, "en-FR")}</time>
                         <div className='container-article'>
                              <div className='container-edit'>
                                   <h3 className='article-title'>{post.title}</h3>
                                   {<div className='author-post'>
                                        <img className='image-profil-post' src={post.User.imageUrl} alt={post.User.userName}></img>
                                        <legend className='author'>{post.User.userName}</legend>
                                   </div>}
                              </div>
                              <div className='container-edit'>
                                   <p className='article-post'>{post.content}</p>
                              </div>
                              <div className='container-btn-icone'>
                                   <i tabIndex={0}
                                        className="fa-solid fa-message"
                                        aria-label="commenter"
                                        role="button"
                                        name="commenter"
                                        onClick={function () { navigate(`/comments/${post.id}`); } }>
                                   </i>
                                   <i className="fa-solid fa-trash-can"
                                        aria-label='supprimer compte'
                                        onClick={function () {
                                             let adminId = localStorage.getItem('adminIsConnected');
                                             if (adminId === null) {
                                                  alert("Seul l'administration est autorisée à supprimer cet article. Un signalement à faire ? Contactez-nous ! Si vous en êtes l'auteur, rendez-vous sur la page 'Mes articles'.");
                                             }
                                             else { navigate(`/adminDeletePost/${post.id}`); }
                                        } }
                                        tabIndex={0}
                                        name='supprimer'
                                        role="button">
                                   </i>
                              </div>
                         </div>
                    </div>
               ))}
          </div>
     </main>;
}

function Routes(navigate) 
{
     function routeDashbord() { navigate('/dashbord'); }
     //utilisation de RouteCreatePost pour créer un post
     function routeCreatePost() { navigate('/createPost')}
     function routeMyArticles() {navigate('/myArticles')}
     return { routeDashbord, routeCreatePost, routeMyArticles };
}

function useEffectGetAllPosts(token, userId, setPosts) {
     useEffect(() => {
          let endpoints = 'http://localhost:3300/api/articles';
          axios(endpoints,
               {
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': token
                    }
               }
          )
               .then(res => {
                    if (token !== null || userId !== null) {
                         setPosts(res.data);
                         //console.log(res.data)
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
     }, [token, userId, setPosts]);
}

function AuthApi() {
     let userId = localStorage.getItem('userIsConnected');
     let token = "Bearer " + localStorage.getItem('accessToken');
     return { token, userId };
}

