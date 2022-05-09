// import utils
import '../styles/index.scss'
import React, { useState } from "react"

//import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"
//function pricipale
function Login() {

     const [formDataLog, setFormDataLog] = React.useState(
          {
              email: "", 
              password: ""
          } 
     )
     //const pour cacher le mot-de-passe lorsqu'un utilisateur l'écrit
     const [passwordIsVisible, setPasswordIsVisible] = useState(false)
     
      // écouter les changements des valeurs des input lorsqu'un utilisateur se connecte
     function handleChangeLog(event) {
          const {name, value, type, checked} = event.target
          setFormDataLog(prevFormDataLog => {
              return {
                  ...prevFormDataLog,
                  [name]: type === "checkbox" ? checked : value
              }
          })
     }
     
     function handleSubmitLog(event) {
     event.preventDefault()
     // submitToApi(formData)
     console.log(formDataLog)
     }
     
     // au clique, lorsqu'un utilisateur se connecte, on vérifie son existence et on lui permet ou non l'accès à son compte
     function SubmitLog(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()

          if(formDataLog !== undefined)
          {
               axios
               ({
                    method: 'post',
                    url: 'http://localhost:3300/api/login',
                    data: 
                    {
                         email : formDataLog.email,
                         password : formDataLog.password
                    }
               })
               .then(function (response) {
                    // handle success
                    
                    window.location.href = `dashbord`;
                  })
               .catch(function (error) {
                    // handle error
               alert(error.message);
               });
          }
     }

     const inserText = (
          <div className="bloc-log">
               <h1 className='groupomania-h1'>Réseau Social</h1>

               <h2 className='groupomania-h2'>Connexion :</h2>
               <p>______________</p>
               <legend>* Tous les champs sont obligatoires</legend>
               <div className='connect'>
               
                    <form onSubmit={handleSubmitLog} className='connect connect-cart'>
                         <input
                              type="email"
                              placeholder="Email"
                              onChange={handleChangeLog}
                              name="email"
                              value={formDataLog.email}
                              required={true}
                         />
                         <div className='iconInInput'>
                              <input
                                   type={passwordIsVisible ? 'text':'password'}
                                   placeholder="Mot-de-passe"
                                   onChange={handleChangeLog}
                                   name="password"
                                   value={formDataLog.password}
                                   required={true}
                              
                              />
                              <i className="fa-solid fa-eye-slash" onClick={()=> setPasswordIsVisible(!passwordIsVisible)}></i>
                         </div>
                         <button onClick={SubmitLog}>
                              Connexion
                         </button>
                    </form>
               </div>
          </div>
     )
     return inserText

}

     
export default Login