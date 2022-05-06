import '../styles/index.scss'
//import React, { useState } from "react"
import axios from "axios"
//function pricipale
function AllArticles() 
{
     axios.get('http://localhost:3300/api/articles')
     .then(response => response.json())
     .then( articles => {
          console.log(articles.firstName)
          for( let article of articles)
          {
               const inserText = JSON.parse(
               <div>
                    <article>
                         <h3 className="firstName">${article.firstName}</h3>
                         <p className="object">${article.ocject}</p>
                         <p className="article">${article.article}</p>
                    </article>
               </div>

               )
               return inserText
          }
     })
     .catch()
}

   
export default AllArticles