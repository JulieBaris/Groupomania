import '../styles/index.scss'
//import React, { useState } from "react"
import axios from "axios"
//function pricipale
function AllComments() 
{
     axios.get('http://localhost:3300/api/comments')
     .then( comments => {
          const commentsData = [{
               firstName: comments.firstName,
               lastName: comments.lastName,
               object: comments.object,
               post: comments.articles,
               imageUrl: comments.imageUrl
          }]
          console.log(commentsData)

          const inserText = (
               <div id='Comment'>
                    <article>
                         <h3 className="firstName">${commentsData.firstName}</h3>
                         <p className="object">${commentsData.object}</p>
                         <p className="article">${commentsData.post}</p>
                    </article>
               </div>

               )
               return inserText
     })
     .catch()
}

   
export default AllComments