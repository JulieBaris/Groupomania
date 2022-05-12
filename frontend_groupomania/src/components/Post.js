import '../styles/index.scss'
import React, { useEffect, useState } from "react"
import axios from "axios"
//function pricipale

function AllArticles(){

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

     
     return ( 
              
          <section>
          <h2>Articles parus</h2>
          
          <div>
               {posts.map((post) => (
               <div key={post.id}>
                    <img src={post.imageUrl} alt={post.object} />
                    <p>{post.firstName}</p>
                    <p>Objet: {post.object}</p>
                    <p>Article: {post.article}</p>
               </div>
               ))}
          </div>
          </section>
     )
}
export default AllArticles
