import '../styles/index.scss'
//import React, { useState } from "react"
import axios from "axios"
//function pricipale
function getAllUsers() 
{
     axios.get('http://localhost:3300/api/allProfils')
     .then(function (users) {
          const user = users.data.users;
          console.log(user[2].userName)

          const inserText = (
               <div id='Users'>
                    <article>
                         <h3 className="userName">${user[0].userName} </h3>
                         <p className="imageUrl">${user[0].imageUrl}</p>
                    </article> 
               </div>

               )
               return inserText
     })
     .catch()
}

export default getAllUsers