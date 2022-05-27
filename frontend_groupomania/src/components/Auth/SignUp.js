// import utils
import '../../styles/index.scss'
import React, { useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"

function SignUp() 
{
     let navigate = useNavigate();
     // const et function nécessaires à la récupération des valeurs des inputs et à leur envoi dans la BDD
     const [formDataSignup, setFormDataSignup] = SignUpUseState()
     //const pour cacher le mot-de-passe lorsqu'un utilisateur l'écrit
     const [passwordIsVisible, setPasswordIsVisible] = useState(false)
     
     // écouter les changements des valeurs des input lorsqu'un utilisateur s'inscrit
     function handleChangeSignup(event) {
          const name = event.target.name;
          const value =  event.target.value;

          setFormDataSignup(prevFormDataSignup => {
              return {
                  ...prevFormDataSignup,
                  [name]: value
              }
          })
     }
     function handleSubmitSignUp(event) {
     event.preventDefault()
     console.log(formDataSignup)
     }
    
     // au clic, lorsqu'un utilisateur s'inscrit on envoie les données dans la bdd
     function SubmitSignUp(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()
          // requête POST auprès de l'API pour envoyer les données dans la BDD     
          axios 
          ({
               method: 'post',
               url: 'http://localhost:3300/api/sign-up',
               headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer token' 
                    },
               data: 
               {
                    userName: formDataSignup.userName,
                    email : formDataSignup.email,
                    password : formDataSignup.password
               }
          })
          .then(res =>
               { //Si les données transmises sont acceptées, rediriger l'utilisateur vers login
                    if(formDataSignup !== undefined)
                    {
                         navigate('/login')
                         alert("Vous êtes inscrit ! Connectez-vous maintenant au réseau social Groupomania.")
                    } // Sinon, une alerte est transmise.
                    else
                    {
                         alert("Les données du formulaires ne répondent pas aux critères. Tous les champs doivent être remplis.")
                         console.log(res.error)
                    }
               })
          .catch(function (error) {
               console.log(error)
               alert(`Le nom d'utilisateur = minimum 3 caractères. L'adresse mail doit être valide. Le mot de passe = 6 caractères minimum, 2 MAJUSCULES, 2 chiffres.`)
          });
     }
     
     // Cons inserText est ce qu'il faut insérer au DOM. 
     const inserText = InserDOM(handleSubmitSignUp, handleChangeSignup, formDataSignup, passwordIsVisible, setPasswordIsVisible, SubmitSignUp)
     return inserText
}

export default SignUp
// ________________________Utils____________________// 
function InserDOM(handleSubmitSignUp, handleChangeSignup, formDataSignup, passwordIsVisible, setPasswordIsVisible, SubmitSignUp) {
     return <div className="bloc-log">
          <h1 className='log-h1'>Réseau Social</h1>
          <h2 className='log-h2'>Inscription :</h2>
          <legend>* Tous les champs sont obligatoires</legend>
          <div className='connect'>

               <form onSubmit={handleSubmitSignUp} className='connect connect-cart'>
                    <input
                         type="text"
                         placeholder="Nom d'utilisateur"
                         onChange={handleChangeSignup}
                         name="userName"
                         value={formDataSignup.userName}
                         required={true}
                         tabIndex={0} />
                    <input
                         type="email"
                         placeholder="Email"
                         onChange={handleChangeSignup}
                         name="email"
                         value={formDataSignup.email}
                         required={true}
                         tabIndex={0} />
                    <div className='iconInInput'>
                         <input
                              type={passwordIsVisible ? 'text' : 'password'}
                              placeholder="Mot-de-passe"
                              onChange={handleChangeSignup}
                              name="password"
                              value={formDataSignup.password}
                              required={true}
                              tabIndex={0} />
                         <i className="fa-solid fa-eye-slash" role="button" onClick={() => setPasswordIsVisible(!passwordIsVisible)} tabIndex={0} name='crypter'></i>
                    </div>
                    <button onClick={SubmitSignUp} tabIndex={0} name='inscription'>
                         Inscription
                    </button>
               </form>
          </div>

     </div>;
}

function SignUpUseState() {
     return React.useState(
          {
               userName: '',
               email: "",
               password: ""
          }
     );
}
