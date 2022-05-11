import '../styles/index.scss'
//import React, { useState } from "react"
import axios from "axios"
//function pricipale

function AllArticles() 
{
     axios.all([
          axios.get('http://localhost:3300/api/articles'),
          axios.get('http://localhost:3300/api/comments')
        ])
        .then(function (response) {
          // handle success
          const article = response[0].data;
          const comment = response[1].data.comments;

          console.log(article[2].firstName)
          console.log(comment[0].firstName)

          const inserText =
               (
                    <div>
                         <h3 className="firstName">${article[2].firstName}</h3>
                         <p className="object">${article[2].object}</p>
                         <p className="article">${article[2].article}</p>
                         <legend className='creat-at'>${article[2].updatedAt}</legend>
                    </div>
          
               )
               return inserText
        })
        .catch(function (error) {
          alert(error, 'un problème est survenu lors du chargement des articles.')
          console.log(error);
        })
        
}

   
export default AllArticles