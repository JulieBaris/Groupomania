import '../styles/index.scss'
//import React, { useState } from "react"
import axios from "axios"
//function pricipale
function AllComments() 
{
     axios.get('http://localhost:3300/api/comments')
     .then(response => response.json())
     .then( comments => {
          console.log(comments)
          for( let comment of comments)
          {
               const inserText = JSON.parse(
               <div>
                    <article>
                         <h3 className="firstName">${comment.firstName}</h3>
                         <p className="object">${comment.ocject}</p>
                         <p className="article">${comment.article}</p>
                    </article>
               </div>

               )
               return inserText
          }
     })
     .catch()
}

   
export default AllComments