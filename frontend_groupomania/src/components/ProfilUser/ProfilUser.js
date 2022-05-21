import '../../styles/index.scss'
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function ProfilUser(){
    let navigate = useNavigate();
   
     // Récupération du token
     const storage = localStorage.getItem('accessToken');
     let token = "Bearer " +  storage;
     //console.log(token)
     const userId = localStorage.getItem('userId')
     console.log(userId)

    const routeDashbord = () =>
    {
        let path = '/dashbord';
        navigate(path)
    }
    //  let {id} = useParams()
    const [user, setUser] = useState(["{}"])
     useEffect(() => {
          let endpoints = `http://localhost:3300/api/profil/${userId}`
          axios.get(endpoints, {headers: {"Authorization" : token}})
          .then(res => {
               setUser(res.data)
               console.log(res.data)
          }
          )
          .catch(error => {console.log(error);})
     }, [token,userId])
    
   // au clique, lorsqu'un utilisateur se connecte, on vérifie son existence et on lui permet ou non l'accès à son compte
   function SubmitUser(event)
   {
        // suppression des paramètres par défaut      
        event.preventDefault()
        navigate("/profil")
        
   }
   function DeleteUser(event)
   {
       event.preventDefault()
       if(user !== undefined)
        {
            alert("le profil utilisateur a été supprimé.")
            axios({
                    method: 'delete',
                    headers: {"Authorization" : token},
                    url: `http://localhost:3300/api/profil/${userId}`,
                    data: 
                    {
                        id: user.id,
                        userName: user.userName,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email : user.email,
                        phone: user.phone, 
                        imageUrl : user.imageUrl
                    }
            })
            .then(function () {
                    // handle success
                navigate('/signup') 
                
                })
            .catch(function (error) {
                    // handle error
            alert(error.message);
            });
        };

   }
        
    
    return (
        <div className="bloc-profilUser">
            <div className='bloc-btn-contact'>
                <button className='btn-return' onClick={routeDashbord}><i className="fa-solid fa-circle-arrow-left"></i></button>
            </div>
            <div className='container-profilUser'>
                <div className='card-profilUser'>
                    <h2 className='profilUser-h2'>Compte Utilisateur</h2>
                    <p className='trait'>___________________</p>
                    {
                        <div key={user.id} className='card-user'>
                            <img src={user.imageUrl} alt={user.firstName} className='imageUser' />
                            <p className='identity'>{user.userName}</p>
                            <p className='identity'>{user.firstName} {user.lastName}</p>
                            <p className='identity'>{user.email}</p>
                            <p className='identity'><i className="fa-solid fa-phone"></i> {user.phone}</p>
                        </div>
                    }
                </div>
                <div className='form-user'>
                    <button className='btn' onClick={SubmitUser}>Mettre à jour</button>
                    <button className='btn' onClick={DeleteUser}>Supprimer mon profil</button> 
                </div>
            </div>
        </div>
    );
}
export default ProfilUser


// function ProfilUser() {
//     let navigate = useNavigate();
//     const routeDashbord = () =>{
//          let path = '/dashbord';
//          navigate(path)
//     }

//     // Récupération de l'url et paramètrage avec UrlSearchParams
//     const recuperationUrl = window.location.search
//     const urlSearchParams = new URLSearchParams(recuperationUrl)
//     // Extraction de l'Id
//     const userId = urlSearchParams.get("id")

//     function getIdParams(){
//         axios.get(`http://localhost:3300/api/profil/${userId}`)
//         .then(response => console.log(response))
//         .catch(function (error) {
//             // handle error
//             alert(error.message);
//         });
//     }
//     getIdParams()
//     //only note down address for individual customers
//     const [data, setData] = useState({
//         email: "",
//         password:"",
//         userName:"",
//         firstName:"",
//         lastName:"",
//         phone:'',
//         imageUrl:""
//     });

//     const handleInfoChange = (event) => {
//         setData((prevalue) => {
//             return {
//                 ...prevalue,
//                 [event.target.email]: event.target.value,
//                 [event.target.password]: event.target.value,
//                 [event.target.userName]: event.target.value,
//                 [event.target.firstName]: event.target.value,
//                 [event.target.lastName]: event.target.value,
//                 [event.target.phone]: event.target.value,
//                 [event.target.imageUrl]: event.target.value
//             }
//         })
//     };

//     function handleClick(event) {
//         event.preventDefault();
//     }

//     let navigate = useNavigate();
//     const routePutChange = () =>{
        
//         alert("le profil utilisateur a été mis à jour avec succès.")
//         axios({
//                 method: 'put',
//                 url: `http://localhost:3300/api/profil/${userId}`,
//                 data: 
//                 {
//                     userName: handleInfoChange.userName,
//                     firstName: handleInfoChange.firstName,
//                     lastName: handleInfoChange.lastName,
//                     email : handleInfoChange.email,
//                     password : handleInfoChange.password,
//                     phone: handleInfoChange.phone, 
//                     imageUrl : handleInfoChange.imageUrl
//                 }
//         })
//         .then(function () {
//                 // handle success
//             navigate('dashbord') 
            
//             })
//         .catch(function (error) {
//                 // handle error
//         alert(error.message);
//         });
//     };
//     const routeDeleteChange = () =>{
//         alert("le profil utilisateur a été supprimé.")
//         axios({
//                 method: 'delete',
//                 url: 'http://localhost:3300/api/profil/:id',
//                 headers: { 'Content-Type': 'application/json' },
//                 data: 
//                 {
//                     userName: data.userName,
//                     firstName: data.firstName,
//                     lastName: data.lastName,
//                     email : data.email,
//                     password : data.password,
//                     phone: data.phone, 
//                     imageUrl : data.imageUrl
//                 }
//         })
//         .then(function () {
//                 // handle success
//             navigate('signup') 
            
//             })
//         .catch(function (error) {
//                 // handle error
//         alert(error.message);
//         });
//     };

//     return (
//         <div className="bloc-profilUser">
//             <div className='bloc-btn-contact'>
//                     <button className='btn-return' onClick={routeDashbord}><i className="fa-solid fa-circle-arrow-left"></i></button>
//                </div>
//             <br />
//             <h2>Compte Utilisateur</h2>
            
//             <p className='p-profilUser'>Mettre à jour les informations de son profil :</p>
//             <br />
//             <form onSubmit={handleClick} name = "count-user">
//                 <div className="input-container">
//                     <label for="file" className='label-file'>Photo de profil</label><br></br>
//                     <input className = "input-file" aria-describedby="Image" onChange = {handleInfoChange} type="file" placeholder="Photo de profil" defaultValue={data.imageUrl} />
//                 </div>
//                 <div className="input-container">
//                     <label>Nom d'utilisateur</label><br></br>
//                     <input className = "input-form-box" aria-describedby="UserName" onChange = {handleInfoChange} type="text" placeholder="Nom d'utilisateur" defaultValue={data.userName} />
//                 </div>
//                 <div className="input-container">
//                     <label>Prénom</label><br></br>
//                     <input className = "input-form-box" aria-describedby="FirstName" onChange = {handleInfoChange} type="text" placeholder="Prénom" defaultValue={data.firstName} />
//                 </div>
//                 <div className="input-container">
//                     <label>Nom</label><br></br>
//                     <input className = "input-form-box" aria-describedby="LastName" onChange = {handleInfoChange} type="text" placeholder="Nom" defaultValue={data.lastName} />
//                 </div>
//                 <div className="input-container">
//                     <label>Email</label><br></br>
//                     <input className = "input-form-box" aria-describedby="Email" onChange = {handleInfoChange} type="text" placeholder="Email" defaultValue={data.email} />
//                 </div>
//                 <div className="input-container">
//                     <label>Téléphone</label><br></br>
//                     <input className = "input-form-box" aria-describedby="Phone Number" onChange = {handleInfoChange} type="number" placeholder="Téléphone" defaultValue={data.phone} />
//                 </div>
//                 <div className="input-container">
//                     <button className='btn' onClick={routePutChange}>Mettre à jour</button>
//                     <button className='btn' onClick={routeDeleteChange}>Supprimer mon profil</button>
//                 </div>
                
//             </form>

//         </div>
//     );
// }
// export default ProfilUser