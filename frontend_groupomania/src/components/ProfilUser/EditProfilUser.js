import '../../styles/index.scss'
import React from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"


function EditProfil()
{
    // permet de rediriger l'utilisateur vers la page /compte
    let navigate = useNavigate();
    function routeProfilUser() {
        let path = '/compte';
        navigate(path);
    }
   // Récupération du token et de l'id de l'utilisateur
   let { userId, token } = AuthApi();
    
    //permet d'observer l'état des données de l'utilisateur
    const [profilUser, setProfilUser] = useStateEditProfil()
    
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
        // console.log(profilUser)
    }
    // au clique de l'utilisateur, on modifie ses données
    function SubmitProfilUser(event)
    {
        // suppression des paramètres par défaut
        event.preventDefault()
        //Si l'id de l'utilisateur existe et que les données saisies par l'utilisateur existent
        if(userId !== undefined && profilUser !== undefined)
        {
            //Requête PUT pour envoyer les données vers la BDD
            axios
            ({
                method: 'put',
                url: `http://localhost:3300/api/profil/${userId}`,
                headers: {"Authorization" : token},
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
                    alert("Tous les champs doivent être saisies ! 🧐")
                }
                //Si la réponse correspond, une alerte s'affiche et l'utilisateur est redirigé vers son compte
                else
                {
                    alert("Le profil a été mis à jour avec succès ! 👌 ");
                    navigate('/compte')
                }
            })
            .catch(function (error) 
            {
                console.log(error)
                alert("Le profil n'a pas été mis à jour ! 🥺");
            });
        }
    }
    // insérer dans le DOM
    const inserText = inserDOM(routeProfilUser, handleSubmitProfil, handleChangePutProfilUser, profilUser, SubmitProfilUser);
    return inserText
}
 
export default EditProfil;

function AuthApi() {
    let userId = localStorage.getItem('userIsConnected');
    let token = "Bearer " + localStorage.getItem('accessToken');
    return { userId, token };
}

function useStateEditProfil() {
    return React.useState(
        {
            userName: '',
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            imageUrl: ""
        });
}

function inserDOM(routeProfilUser, handleSubmitProfil, handleChangePutProfilUser, profilUser, SubmitProfilUser) {
    return <div className="bloc-profilUser">
        <div className='bloc-btn-contact'>
            <i className="fa-solid fa-circle-arrow-left"
                aria-label='retour'
                onClick={routeProfilUser}
                tabIndex={0}
                name='retour'
                role="button"></i>
        </div>

        <div className='container-profilUser'>
            <div className='form-user'>
                <h2 className='editProfil-h2'>Mettre à jour le profil</h2>
                <form onSubmit={handleSubmitProfil} name="count-user" className='form-createPost'>
                    <div className='container-form-pro'>
                        <input className="input-form-box"
                            aria-label="Image"
                            aria-describedby="Image"
                            name='imageUrl'
                            onChange={handleChangePutProfilUser}
                            type="text" placeholder="copier l'URL de l'image"
                            value={profilUser.imageUrl}
                            tabIndex={0} />
                    </div>
                    <div>
                        <input className="input-form-box"
                            aria-describedby="userName"
                            aria-label='userName'
                            name='userName'
                            onChange={handleChangePutProfilUser}
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={profilUser.userName}
                            tabIndex={0} />
                    </div>
                    <div>
                        <input className="input-form-box"
                            aria-describedby="firstName"
                            aria-label='firstName'
                            name='firstName'
                            onChange={handleChangePutProfilUser}
                            type="text"
                            placeholder="Prénom"
                            value={profilUser.firstName}
                            tabIndex={0} />
                    </div>
                    <div>
                        <input className="input-form-box"
                            aria-describedby="LastName"
                            aria-label='lastName'
                            name='lastName'
                            onChange={handleChangePutProfilUser}
                            type="text"
                            placeholder="Nom"
                            value={profilUser.lastName}
                            tabIndex={0} />
                    </div>
                    <div>
                        <input className="input-form-box"
                            aria-describedby="Phone Number"
                            aria-label='phone number'
                            name='phone'
                            onChange={handleChangePutProfilUser}
                            type="number"
                            placeholder="Téléphone"
                            value={profilUser.phone}
                            tabIndex={0} />
                    </div>
                    <div>
                        <button className='btn' onClick={SubmitProfilUser}>Mettre à jour</button>
                    </div>
                </form>

            </div>
        </div>
    </div>;
}
