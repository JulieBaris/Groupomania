import '../styles/index.scss'
//import React, { useState } from "react"
import axios from "axios"
//function pricipale
function ProfilsUsers() 
{
     axios.get('http://localhost:3300/api/allProfils')
     .then(response => response.json())
     .then( users => {
          console.log(users)
          for( let user of users)
          {
               const inserText = JSON.parse(
               <div>
                    <article>
                         <h3 className="id">${user.id}</h3>
                         <p className="firstName">${user.firstName}</p>
                         <p className="lastName">${user.firstName}</p>
                    </article>
               </div>

               )
               return inserText
          }
     })
     .catch()
}

export default ProfilsUsers