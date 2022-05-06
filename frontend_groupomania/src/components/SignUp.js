// import utils
import '../styles/index.scss'
import React, { useState } from "react"

//import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"
//function pricipale
function SignUp() {

     // const et function nécessaires à la récupération des valeurs des inputs et à leur envoi dans la BDD
     const [formDataSignup, setFormDataSignup] = React.useState(
          {
              email: "", 
              password: ""
          } 
     )
     //const pour cacher le mot-de-passe lorsqu'un utilisateur l'écrit
     const [passwordIsVisible, setPasswordIsVisible] = useState(false)
     
     // écouter les changements des valeurs des input lorsqu'un utilisateur s'inscrit
     function handleChangeSignup(event) {
          const {name, value, type, checked} = event.target
          setFormDataSignup(prevFormDataSignup => {
              return {
                  ...prevFormDataSignup,
                  [name]: type === "checkbox" ? checked : value
              }
          })
     }
     
     function handleSubmitSignUp(event) {
     event.preventDefault()
     // submitToApi(formData)
     console.log(formDataSignup)
     }
    
     // au clic, lorsqu'un utilisateur s'inscrit on envoie les données dans la bdd
     function SubmitSignUp(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()
         
               axios 
                    ({
                         method: 'post',
                         url: 'http://localhost:3300/api/sign-up',
                         data: 
                         {
                              email : formDataSignup.email,
                              password : formDataSignup.password
                         }
                    })
                    .then(function () {
                         // handle success
                        window.location.href = 'dashbord'
                        
                       
                       })
                    .catch(function (error) {
                         // handle error
                    alert(error.message);
                    });
               
         
     }
     
     const inserText = (
          <div className="bloc-log">
               <h1 className='groupomania-h1'>Réseau Social</h1>
               <h2 className='groupomania-h2'>Inscription :</h2>
               <p>______________</p>
              
               <legend>* Tous les champs sont obligatoires</legend>
               <div className='connect'>
                   
                    <form onSubmit={handleSubmitSignUp} className='connect connect-cart'>
                         <input
                              type="email"
                              placeholder="Email"
                              onChange={handleChangeSignup}
                              name="email"
                              value={formDataSignup.email}
                              required={true}
                         />
                         <div className='iconInInput'> 
                              <input
                                   type={passwordIsVisible ? 'text':'password'}
                                   placeholder="Mot-de-passe"
                                   onChange={handleChangeSignup}
                                   name="password"
                                   value={formDataSignup.password}
                                   required={true}
                              />
                              <i className="fa-solid fa-eye-slash" onClick={()=> setPasswordIsVisible(!passwordIsVisible)}></i>
                         </div>
                         <button onClick={SubmitSignUp}>
                              Inscription
                         </button>
                    </form>
               </div>
               
          </div>
     )
     return inserText

}

export default SignUp