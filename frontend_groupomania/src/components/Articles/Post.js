import '../../styles/index.scss'
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"

function AllArticles()
{
     // Récupération du token et de l'id de l'utilisateur
     let userId = localStorage.getItem('userIsConnected');
     let token = "Bearer " + localStorage.getItem('accessToken');
//      const [user, setUser] = useState([{
//      id : '', 
//      userName:'', 
//      firstName:'',
//      lastName:'',
//      imageUrl:''
// }])

     //récupération de données relatives aux articles 
     const [posts, setPosts] = useState([{
          // UserId :"",
          // userId:'',
          // userName:'',
          title : "",
          content : "", 
          imageUrl : ""
     }])
    
     
     useEffect (() => 
     {
          let endpoints = 'http://localhost:3300/api/articles'
          axios(endpoints,
               {headers: 
                    {
                         'Content-Type': 'application/json',
                         'Authorization': token
                    }
               },
               )
          .then(res => 
               {
                    if(token !== null && userId !== null)
                    {
                         setPosts(res.data)
                         // localStorage.setItem('articles', JSON.stringify(res.data))
                         // const dataUser =localStorage.getItem("articles", res.data)
                         // const UserData = JSON.parse(dataUser)
                         // console.log(UserData.UserId)

                         // const GetInfoUser = localStorage.getItem('articles', JSON.stringify(res.data.User))
                         // console.log(GetInfoUser)
                         // const storageArticles = localStorage.getItem('articles')
                         // const arrayArticles = JSON.parse(storageArticles)
                         // console.log(res.data)
                         // console.log(res.data.User.userName)
                    }
                    else{
                         // alert("Veuillez vous connecter !")
                    }
               }
          )
          .catch(error => 
               {
                    console.log(error.message);
                    //alert(error,"La requête n'a pas pu aboutir");
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
     
     const routeMyArticles = () =>
     {
          navigate('/myArticles')          
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

     let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};

     const inserText = ( 
     <main className="bloc-cards">           
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
               <form onSubmit={handleClick} name = "search-article" className='search' method="post">
               
                    <input className='search-input'
                    type="search"
                    name="search"
                    aria-label='rechercher'
                    tabIndex={0}
                    placeholder="ex : Ecologie" />

                    <i 
                    tabIndex={0} 
                    aria-label='envoyer'
                    className="fa-solid fa-magnifying-glass"
                    role="button"></i>
               </form>
          </div>
               {posts.map((post) => (
               <div key={post.id} className='card-article' tabIndex={0}>
                    <img src={post.imageUrl} alt={post.title} className='imageArticle'/>
                    
                    <time>{(new Date()).toLocaleDateString(options, post.updatedAt, "en-FR")}</time>
                    <div className='container-article'>
                         <div className='container-edit'>
                              <h3 className='article-title'>{post.title}</h3>
                              {/* {<div className='author-post'>
                              <img className='image-profil-post' src={post.User.imageUrl} alt={post.User.userName}></img> 
                              <legend className='author'>{post.User.userName}</legend>
                              </div>} */}
                         </div>
                         <div className='container-edit'>
                              <p className='article-post'>{post.content}</p>
                         </div>
                         {/* <div className='container-btn-icone'>
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
                         </div>       */}
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
                                   aria-label='commentaire'
                                   tabIndex={0}
                              />
                              <button 
                                   className='btn-createPost' 
                                   onClick={SubmitComment} 
                                   name='créer' 
                                   aria-label='créer' 
                                   tabIndex={0}>
                                        Commenter
                              </button>
                         </form>
                    </div>
               </div>
               ))}
          </div>
     </main>)
return inserText
}
export default AllArticles





 // useEffect(() => 
     // {
     //      let endpoints = `http://localhost:3300/api/profil/${userId}`
     //      axios(endpoints,
     //           {headers: 
     //                {
     //                     'Content-Type': 'application/json',
     //                     'Authorization': token
     //                }
     //           }
     //           )
     //      .then(res => 
     //           {
     //                if(token !== null && userId !== null)
     //                {
     //                     setUser(res.data)
     //                     console.log(res.data)
     //                }
     //                else
     //                {
     //                     alert("Veuillez vous connecter !")
     //                }
     //           }
     //      )
     //      .catch(error => 
     //           {
     //                console.log(error.message);
     //                alert("Connectez-vous pour accéder à l'historique de vos articles.");
     //           })
     // }, [token, userId, posts])

     // RoutePutPost pour modifier un post
     // const routePutPost = () =>
     // {
     //      navigate('/article')          
     // }