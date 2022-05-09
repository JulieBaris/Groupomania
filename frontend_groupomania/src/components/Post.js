import '../styles/index.scss'
//import React, { useState } from "react"
import axios from "axios"
//function pricipale

const getAllArticles = async () => 
{
     try {
          return await axios.get('https://localhost:3300/api/articles')
     } 
     catch (error) 
     {
          console.error(error)
     }
}


const AllArticles = async () => {
     const articles = getAllArticles()
     .then( response => {
          if (response) 
          {
               console.log(articles.firstName)
          }

     })
     .catch(error =>{
          console.log(error)
     })
     
}


   
export default AllArticles