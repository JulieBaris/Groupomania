import '../styles/index.scss'
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"
//function pricipale

function AllArticles(){
     let navigate = useNavigate();
     const routeDashbord = () =>{
        let path = '/dashbord';
        navigate(path)
    }
    function handleClick(event) {
     event.preventDefault();
}
const handleInfoChange = (event) => {
     setComments((prevalue) => {
         return {
             ...prevalue,
             [event.target.comment]: event.target.value
         }
     })
 };

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

     const [comments, setComments] = useState([{}])
     useEffect(() => {
          
          let endpoint = 'http://localhost:3300/api/comments'
          axios.get(endpoint)
          .then(res => {
               setComments(res.data.comments)
               console.log(res.data.comments)
          }
          )
          .catch(error => {console.log(error);})
     }, [])

     
     return ( 
              
          <div className="bloc-cards">
               <div className='bloc-btn-contact'>
                    <button className='btn-return' onClick={routeDashbord}><i className="fa-solid fa-circle-arrow-left"></i></button>
               </div>
               <h2>Articles parus</h2>
               <div className='bloc-article'>
                    <form onSubmit={handleClick} name = "search-article" className='search' method="post">
                         <div className="input-container">
                              <input className='search-input' type="search" name="search" placeholder="ex : Ecologie" />
                              <input className="submit-input" type="submit" name="submit" value='GO' />
                         </div>
                    </form>
               </div>
               
               <div className='bloc-card-article'>
                   
                    {posts.map((post) => (
                         
                         <div key={post.id} className='card-article'>
                              <img src={post.imageUrl} alt={post.firstName} className='imageArticle' />
                              <div className='container-article'>
                                   <h3 className='article-title'>{post.firstName} {post.lastName}</h3>
                                   <p className='article-object'>{post.object}</p>
                                   <p className='article-post'>{post.article}</p>
                              </div>
                              <div>
                                   {comments.map((comment) => (
                                        <div key={comment.id} className='card-comment'>
                                             <div className="input-container">
                                                  <input className = "input-form-box" aria-describedby="Commentaire" onChange = {handleInfoChange} type="text" placeholder="commentez la publication" />
                                             </div>
                                             <div className='container-comment'>
                                                  <h3 className='comment-title'>{comment.firstName} {comment.lastName}</h3>
                                                  <p className='comment-post'>{comment.comment}</p>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         </div>
                    ))}
                    
                    
               </div>
          </div>
     )
}
export default AllArticles
