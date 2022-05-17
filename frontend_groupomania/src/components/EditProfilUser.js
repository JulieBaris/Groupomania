import '../styles/index.scss'
import React from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"


function EditProfil(){
     let navigate = useNavigate();
     const routeProfilUser = () =>{
        let path = '/dashbord/compte/id';
        navigate(path)
    }
     const [formDataProfilUser, setFormDataProfilUser] = React.useState(
          {
               userName:'',
              firstName: "", 
              lastName: "",
              phone: "",
              email:"",
              imageUrl:""
          } 
     )
      // écouter les changements des valeurs des input lorsqu'un utilisateur souhaite créer un post
      function handleChangePutProfilUser(event) {
          const {name, value, type, checked} = event.target
          setFormDataProfilUser(prevFormDataProfil => {
              return {
                  ...prevFormDataProfil,
                  [name]: type === "checkbox" ? checked : value
              }
          })
     }
     function handleSubmitProfil(event) {
          event.preventDefault()
          // submitToApi(formData)
          console.log(formDataProfilUser)
          }
     // au clique, lorsqu'un utilisateur se connecte, on vérifie son existence et on lui permet ou non l'accès à son compte
     function SubmitProfilUser(event)
     {
          // suppression des paramètres par défaut      
          event.preventDefault()

          if(formDataProfilUser !== undefined)
          {
               // let params = new URLSearchParams(document.location.search);
               // let id = params.get("id");
               axios
               ({
                    method: 'put',
                    url: `http://localhost:3300/api/profil/4`,
                    data: 
                    {
                         userName : formDataProfilUser.userName,
                         firstName : formDataProfilUser.firstName,
                         lastName : formDataProfilUser.lastName,
                         phone: formDataProfilUser.phone,
                         email: formDataProfilUser.email,
                         imageUrl: formDataProfilUser.imageUrl
                    }
               })
               .then(function (response) {
                    // handle success
                    return(alert("Le profil a été mis à jour avec succès ! "),
                    navigate('/dashbord/compte/id'))
                    
                  })
               .catch(function (error) {
                    // handle error
               alert(error.message);
               });
          }
     }
     //route change after checking for corporate discount
     
     return (
          <div className="bloc-profilUser">
            <div className='bloc-btn-contact'>
                <button className='btn-return' onClick={routeProfilUser}><i className="fa-solid fa-circle-arrow-left"></i></button>
            </div>
            
            <div className='container-profilUser'>
                <div className='form-user'>
                    <h2 className='profilUser-h2'>Mettre à jour le profil</h2>
                    <p className='trait'>_____________________</p>
                    <form onSubmit={handleSubmitProfil} name = "count-user" className='form-createPost'>
                        <div className='container-form-pro'>
                            <input className = "input-form-box" aria-describedby="Image"  name='imageUrl' onChange = {handleChangePutProfilUser} type="text" placeholder="copier l'adresse de l'image" value={formDataProfilUser.imageUrl}/>
                        </div>
                        <div >
                            <input className = "input-form-box" aria-describedby="userName"  name='userName' onChange = {handleChangePutProfilUser} type="text" placeholder="Nom d'utilisateur" value={formDataProfilUser.userName} />
                        </div>
                        <div >
                            <input className = "input-form-box" aria-describedby="FirstName" name='firstName' onChange = {handleChangePutProfilUser} type="text" placeholder="Prénom" value={formDataProfilUser.firstName}/>
                        </div>
                        <div>
                            <input className = "input-form-box" aria-describedby="LastName" name='lastName' onChange = {handleChangePutProfilUser} type="text" placeholder="Nom" value={formDataProfilUser.lastName} />
                        </div>
                        <div >
                            <input className = "input-form-box" aria-describedby="Email" name='email' onChange = {handleChangePutProfilUser} type="text" placeholder="Email" value={formDataProfilUser.email} />
                        </div>
                        <div>
                            <input className = "input-form-box" aria-describedby="Phone Number" name='phone' onChange = {handleChangePutProfilUser} type="number" placeholder="Téléphone" value={formDataProfilUser.phone}/>
                        </div>
                        <div >
                            <button className='btn' onClick={SubmitProfilUser}>Mettre à jour</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
     );
 }
 
 export default EditProfil;