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
          let endpoints = 'http://localhost:3300/api/articleByUserId'
          axios
          ({
               method: 'post',
               url: endpoints,
               headers: { 
                    "Content-type" : 'application/json',
                    'Authorization': token
          },
               data: 
               {
                    UserId: userId
               }
          }) 
          .then(res => 
               {
                    if(token !== null && userId !== null)
                    {
                         console.log(res.data)
                         setPosts(res.data)
                    }
                    else{
                        // alert("Veuillez vous connecter !")
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
     // RoutePutPost pour modifier un post
     // const routePutPost = () =>
     // {
     //      navigate(`/article/:id`)          
     // }
     
     let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};

     const inserText = ( 
     <main className="bloc-cards">           
          <div className='bloc-card-article'>
               <div className='bloc-article'>
               <h2 className='groupomania-h2'>Mes articles</h2>
          </div>
               {posts.map((post) => (
               <div key={post.id} className='card-myArticles' tabIndex={0}>
                    <img src={post.imageUrl} alt={post.title} className='images-myArticles'/>
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
                              <i onClick={function () {navigate(`/article/${post.id}`)}} 
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
