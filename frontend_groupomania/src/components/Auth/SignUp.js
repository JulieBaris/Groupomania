// import utils
import '../../styles/index.scss'
import React, { useState } from "react"
import {useNavigate} from "react-router-dom";

//import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"
//function pricipale
function SignUp() {
     let navigate = useNavigate();
     // const et function nécessaires à la récupération des valeurs des inputs et à leur envoi dans la BDD
     const [formDataSignup, setFormDataSignup] = React.useState(
          {
               userName:'',
               email: "",
               password: ""
          } 
     )
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
               {
                    if(formDataSignup !== undefined)
                    {
                         navigate('/login')
                         alert("Vous êtes inscrit ! Connectez-vous maintenant au réseau social Groupomania.")
                    }
                    else
                    {
                         alert(res.error)
                         console.log(res.error)
                    }
               })
          .catch(function (error) {
               console.log(error)
               alert(error)
               if(formDataSignup.userName.length < 3 || formDataSignup.userName === undefined )
               {   
                    return(alert("Le nom doit contenir minimum 3 caractères"))
               }
               else if(formDataSignup.email === undefined || formDataSignup.email !== RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formDataSignup.email)) )
               {
                    return(alert("Veuillez saisir une adresse mail valide."))
               }
               else if(formDataSignup.password !== RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/).test(formDataSignup.password))
               {
                    return(alert("Le mot de passe doit être complexe : 6 caractères min, 2 MAJ, 2Chiffre !")) 
               } 
          });
     }
     
     const inserText = (
          <div className="bloc-log">
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
                              tabIndex={0}
                         />
                         <input
                              type="email"
                              placeholder="Email"
                              onChange={handleChangeSignup}
                              name="email"
                              value={formDataSignup.email}
                              required={true}
                              tabIndex={0}
                         />
                         <div className='iconInInput'> 
                              <input
                                   type={passwordIsVisible ? 'text':'password'}
                                   placeholder="Mot-de-passe"
                                   onChange={handleChangeSignup}
                                   name="password"
                                   value={formDataSignup.password}
                                   required={true}
                                   tabIndex={0}
                              />
                              <i className="fa-solid fa-eye-slash"  role="button" onClick={()=> setPasswordIsVisible(!passwordIsVisible)} tabIndex={0} name='crypter'></i>
                         </div>
                         <button onClick={SubmitSignUp} tabIndex={0} name='inscription'>
                              Inscription
                         </button>
                    </form>
               </div>
               
          </div>
     )
     return inserText

}

export default SignUp