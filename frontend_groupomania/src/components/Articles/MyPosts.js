import '../../styles/index.scss'
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"

function MyPosts()
{
     // permet de rediriger l'utilisateur
     let navigate = useNavigate();
     // Récupération du token et de l'id de l'utilisateur
     let { userId, token } = AuthApi();
     //récupération de données relatives aux utilisateurs et aux articles 
     const [user, setUser] = useStateUser()
     const [posts, setPosts] = useStatePosts(userId)
     // Requête pour récupérer les données relatives aux articles publiés par un utilisateur en particlier
     useEffectPostsByUser(token, userId, setPosts);
     useEffectUser(userId, token, setUser);

     //DeleteAllMyPosts permet à un utilisateur de supprimer tous ses articles
     function DeleteAllMyPosts(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()
          // S'il y a des articles, au clic on supprime tous les articles.
          if(posts !== undefined)
          {
               axios
               ({
                    method: 'delete',
                    url: `http://localhost:3300/api/myArticles`,
                    headers: { 
                         'Content-Type': 'application/json',
                         'Authorization': token
                     },
                    data: 
                    {
                         UserId: userId,
                         title : posts.title,
                         content : posts.content,
                         imageUrl: posts.imageUrl
                    }
               })
               .then(function (response) 
               {
                    console.log(response.message)
                    alert("Tous les articles ont bien été supprimés ! ")
                    navigate("/articles")
               })
               .catch(function (error) 
               {
                    alert("Oups, vos articles n'ont pas pu être supprimés ! 😭")
                    console.log(error.message)
               });
          }
     }
     // Options de paramétrage de la date
     let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};

     // inserText est la constante à retourner dans le DOM
     const inserText = InserDOM(posts, options, user, navigate, token, DeleteAllMyPosts)
     // On return la constante inserText
     return inserText
}

export default MyPosts
//_______________________Utils_________________//
function InserDOM(posts, options, user, navigate, token, DeleteAllMyPosts) {
     return <main className="bloc-cards">
          <div className='bloc-card-article'>
               <div className='bloc-article'>
                    <h2 className='groupomania-h2'>Mes articles</h2>
               </div>
               {posts.map((post) => (
                    <div key={post.title} className='card-myArticles' tabIndex={0}>
                         <img src={post.imageUrl} alt={post.title} className='images-myArticles' />
                         <time>{(new Date()).toLocaleDateString(options, post.updatedAt, "en-FR")}</time>
                         <div className='container-article'>
                              <div className='container-edit'>
                                   <h3 className='article-title'>{post.title}</h3>
                                   {(<div key={user.id}>
                                        <img className='image-profil-post' src={user.imageUrl} alt={user.userName}></img>
                                   </div>)}
                              </div>
                              <div className='container-edit'>
                                   <p className='article-post'>{post.content}</p>
                              </div>
                              <div className='container-btn-icone'>
                                   <i onClick={function () { navigate(`/article/${post.id}`); } }
                                        tabIndex={0}
                                        aria-label="modifier"
                                        className="fa-solid fa-pen-clip"
                                        role="button"
                                        name="modifier"></i>
                                   <i className="fa-solid fa-trash-can"
                                        aria-label="supprimer l'article"
                                        onClick={(event) => {
                                             // suppression des paramètres par défaut      
                                             event.preventDefault();
                                             // s'il y a un article on envoie la requête DELETE à l'API
                                             if (posts !== undefined) {
                                                  axios({
                                                       method: 'delete',
                                                       url: `http://localhost:3300/api/article/${post.id}`,
                                                       headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': token
                                                       },
                                                       data: {
                                                            title: posts.title,
                                                            content: posts.content,
                                                            imageUrl: posts.imageUrl
                                                       }
                                                  })
                                                       .then(function (response) {
                                                            console.log(response.message);
                                                            alert("L'article a bien été supprimé ! ");
                                                            window.location.reload();
                                                       })
                                                       .catch(function (error) {
                                                            alert("Oups, l'article n'a pas été supprimé ! 😭");
                                                            console.log(error.message);
                                                       });
                                             }
                                        } }
                                        tabIndex={0}
                                        name='supprimer'
                                        role="button"></i>
                              </div>
                         </div>
                    </div>
               ))}
               <div className='form-user'>
                    <button className='btn' onClick={DeleteAllMyPosts} tabIndex={0} aria-label='supprimer'>Supprimer mes articles</button>
               </div>
          </div>
     </main>;
}
function useStatePosts(userId) {
     return useState([
          {
               userId: { userId },
               title: "",
               content: "",
               imageUrl: ""
          }
     ]);
}

function useStateUser() {
     return useState([
          {
               id: '',
               userName: '',
               firstName: '',
               lastName: '',
               imageUrl: ''
          }
     ]);
}
function useEffectUser(userId, token, setUser) {
     useEffect(() => {
          let endpoints = `http://localhost:3300/api/profil/${userId}`;
          axios(endpoints,
               {
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': token
                    }
               }
          )
               .then(res => {
                    if (token !== null && userId !== null) {
                         setUser(res.data);
                        // console.log(res.data);
                    }

                    else {
                         alert("Vous n'êtes pas connecté ! 😭");
                    }
               }
               )
               .catch(error => {
                    console.log(error.message);
                    alert("Oups ! Un problème de connexion ? 🥺");
               });
     }, [token, userId, setUser]);
}

function useEffectPostsByUser(token, userId, setPosts) {
     useEffect(() => {
          let endpoints = 'http://localhost:3300/api/articleByUserId';
          axios({
               method: 'post',
               url: endpoints,
               headers: {
                    "Content-type": 'application/json',
                    'Authorization': token
               },
               data: {
                    UserId: userId
               }
          })
               .then(res => {
                    if (token !== null && userId !== null) 
                    {
                        // console.log(res.data);
                         setPosts(res.data);
                    }
                    else 
                    {
                         alert("Nous n'avons pas trouvé vos articles ! 😭");
                    }
               }
               )
               .catch(error => {
                    console.log(error.message);
                    alert('Connectez-vous pour accéder aux articles publiés. 🥺');
               });
     }, [token, userId, setPosts]);
}

function AuthApi() {
     let userId = localStorage.getItem('userIsConnected');
     let token = "Bearer " + localStorage.getItem('accessToken');
     return { userId, token };
}

