// import utils
import '../../styles/index.scss'
import React, { useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"

function Login() 
{
     let navigate = useNavigate();
     // obseve et gère les données saisies et envoyées
     const [formDataLog, setFormDataLog] = useStateLog()
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
     
     function handleSubmitLog(event) {event.preventDefault()}
     
     // Au clic, on donne accès à l'utilisateur si la connexion est validée
     function SubmitLog(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()
          // Si le formulaire est rempli
          if(formDataLog !== undefined)
          {
               // On envoie les données à la BDD 
               axios
               ({
                    method: 'post',
                    url: 'http://localhost:3300/api/login',
                    headers: { "Content-type" : 'application/json'},
                    data: 
                    {
                         email : formDataLog.email,
                         password : formDataLog.password
                    }
               }) 
               //Puis on sauvegarde le token et id de l'utilisateur qui est généré
               .then(function (response) 
               {
                    let { userId, token } = AuthApi(response);
                    // si l'id et le token sont undefined on retourne une erreur
                    if(userId === undefined && token === undefined)
                    {
                         return(
                             console.log(response.error), 
                             alert("On dirait bien qu'une erreur s'est produite ! 😭 ")
                         )
                    }
                    // Sinon, on permet l'accès au menu principal
                    else
                    {
                         navigate('/dashbord')
                         alert('Bienvenue sur le réseau social Groupomania ! 🤩')
                         window.location.reload()  
                    }                    
                  })
               .catch(function (error) 
               {
                    if(error)
                    {
                         return(
                         console.log(error.message),
                         alert("L'utilisateur n'a pas pu être identifié. Retentez de vous connecter !😧 ")
                         )
                    }
               });
          }
     }
     //Inserer dans le DOM
     const inserText = InserDOM(handleSubmitLog, handleChangeLog, formDataLog, passwordIsVisible, setPasswordIsVisible, SubmitLog)
     return inserText
}
export default Login


//__________________________Utils___________________________//
function InserDOM(handleSubmitLog, handleChangeLog, formDataLog, passwordIsVisible, setPasswordIsVisible, SubmitLog) {
     return <div className="bloc-log">
          <h1 className='groupomania-h1'>Réseau Social</h1>
          <h2 className='log-h2'>Connexion :</h2>
          <legend>* Tous les champs sont obligatoires</legend>
          <div className='connect'>

               <form onSubmit={handleSubmitLog} className='connect connect-cart'>
                    <input
                         type="email"
                         placeholder="Email"
                         onChange={handleChangeLog}
                         name="email"
                         aria-label='email'
                         value={formDataLog.email}
                         required={true}
                         tabIndex={0} />
                    <div className='iconInInput'>
                         <input
                              type={passwordIsVisible ? 'text' : 'password'}
                              placeholder="Mot-de-passe"
                              onChange={handleChangeLog}
                              name="password"
                              aria-label='password'
                              value={formDataLog.password}
                              required={true}
                              tabIndex={0} />
                         <i className="fa-solid fa-eye-slash" role="button" onClick={() => setPasswordIsVisible(!passwordIsVisible)} tabIndex={0} name='crypter'></i>
                    </div>
                    <button onClick={SubmitLog} tabIndex={0} name='connexion'>
                         Connexion
                    </button>
               </form>
          </div>
     </div>;
}

function AuthApi(response) {
     localStorage.setItem('userIsConnected', JSON.stringify(response.data.id));
     let userId = localStorage.getItem('userIsConnected');
     localStorage.setItem('accessToken', JSON.stringify(response.data.token));
     let token = localStorage.getItem('accessToken');
     return { userId, token };
}

function useStateLog() {
     return React.useState(
          {
               email: "",
               password: ""
          }
     );
}
