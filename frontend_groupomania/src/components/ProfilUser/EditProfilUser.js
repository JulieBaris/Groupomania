import '../../styles/index.scss'
import React from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"


function EditProfil()
{
    // permet de rediriger l'utilisateur vers la page /compte
    let navigate = useNavigate();
    const routeProfilUser = () =>
    {
        let path = '/compte';
        navigate(path)
    }
    //permet de récupérer l'id de l'utilisateur
    const userId = localStorage.getItem('userId')
    
    //permet d'observer l'état des données de l'utilisateur
    const [profilUser, setProfilUser] = React.useState(
        {
            userName:'',
            firstName: "",
            lastName: "",
            phone: "",
            email:"",
            imageUrl:""
        })
    
    // écoute les changements des valeurs des input lorsqu'un utilisateur souhaite modifier son profil
    function handleChangePutProfilUser(event) 
    {
        const {name, value, type, checked} = event.target
        setProfilUser(prevDataProfilUser => {
            return{
                ...prevDataProfilUser,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function handleSubmitProfil(event) {
        event.preventDefault()
        console.log(profilUser)
    }
    // au clique de l'utilisateur, on vérifie son existence(id) et on lui permet de modifier ses informations
    function SubmitProfilUser(event)
    {
        // suppression des paramètres par défaut
        event.preventDefault()
        //Si l'id de l'utilisateur existe et que les données saisies par l'utilisateur existent
        if(userId !== undefined && profilUser !== undefined)
        {
            //Avec la méthode Put de Acios, on envoie les données saisies dans la BBD
            axios
            ({
                method: 'put',
                url: `http://localhost:3300/api/profil/${userId}`,
                //headers: {"Authorization" : token},
                data: 
                {
                    userName : profilUser.userName,
                    firstName : profilUser.firstName,
                    lastName : profilUser.lastName,
                    phone: profilUser.phone,
                    imageUrl: profilUser.imageUrl
                }
            })
            .then(function (response)
            {
                //Si la réponse ne correspond pas, une alerte s'affiche
                if(response === undefined)
                {
                    alert("Le profil n'a pas été mis à jour !")
                }
                //Si la réponse correspond, une alerte s'affiche et l'utilisateur est redirigé vers son compte
                else
                {
                    alert("Le profil a été mis à jour avec succès ! ");
                    navigate('/compte')
                }
            })
            .catch(function (error) 
            {
                console.log(error)
                alert("Tous les champs doivent être saisies !");
            });
        }
    }
    
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
                            <input className = "input-form-box" aria-describedby="Image"  name='imageUrl' onChange = {handleChangePutProfilUser} type="text" placeholder="copier l'URL de l'image" value={profilUser.imageUrl}/>
                        </div>
                        <div >
                            <input className = "input-form-box" aria-describedby="userName"  name='userName' onChange = {handleChangePutProfilUser} type="text" placeholder="Nom d'utilisateur" value={profilUser.userName} />
                        </div>
                        <div >
                            <input className = "input-form-box" aria-describedby="FirstName" name='firstName' onChange = {handleChangePutProfilUser} type="text" placeholder="Prénom" value={profilUser.firstName}/>
                        </div>
                        <div>
                            <input className = "input-form-box" aria-describedby="LastName" name='lastName' onChange = {handleChangePutProfilUser} type="text" placeholder="Nom" value={profilUser.lastName} />
                        </div>
                        <div>
                            <input className = "input-form-box" aria-describedby="Phone Number" name='phone' onChange = {handleChangePutProfilUser} type="number" placeholder="Téléphone" value={profilUser.phone}/>
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