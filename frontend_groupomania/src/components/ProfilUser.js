import '../styles/index.scss'
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';


export default function ProfilUser() {

    // Récupération de l'url et paramètrage avec UrlSearchParams
    const recuperationUrl = window.location.search
    const urlSearchParams = new URLSearchParams(recuperationUrl)
    // Extraction de l'Id
    const userId = urlSearchParams.get("id")

    function getIdParams(){
        axios.get(`http://localhost:3300/api/profil/${userId}`)
        .then(response => console.log(response))
        .catch(function (error) {
            // handle error
            alert(error.message);
        });
    }
    getIdParams()
    //only note down address for individual customers
    const [data, setData] = useState({
        email: "",
        password:"",
        userName:"",
        firstName:"",
        lastName:"",
        phone:'',
        imageUrl:""
    });

    const handleInfoChange = (event) => {
        setData((prevalue) => {
            return {
                ...prevalue,
                [event.target.email]: event.target.value,
                [event.target.password]: event.target.value,
                [event.target.userName]: event.target.value,
                [event.target.firstName]: event.target.value,
                [event.target.lastName]: event.target.value,
                [event.target.phone]: event.target.value,
                [event.target.imageUrl]: event.target.value
            }
        })
    };

    function handleClick(event) {
        event.preventDefault();
    }

    let navigate = useNavigate();
    const routePutChange = () =>{
        
        alert("le profil utilisateur a été mis à jour avec succès.")
        axios({
                method: 'put',
                url: `http://localhost:3300/api/profil/${userId}`,
                data: 
                {
                    userName: handleInfoChange.userName,
                    firstName: handleInfoChange.firstName,
                    lastName: handleInfoChange.lastName,
                    email : handleInfoChange.email,
                    password : handleInfoChange.password,
                    phone: handleInfoChange.phone, 
                    imageUrl : handleInfoChange.imageUrl
                }
        })
        .then(function () {
                // handle success
            navigate('dashbord') 
            
            })
        .catch(function (error) {
                // handle error
        alert(error.message);
        });
    };
    const routeDeleteChange = () =>{
        alert("le profil utilisateur a été supprimé.")
        axios({
                method: 'delete',
                url: 'http://localhost:3300/api/profil/:id',
                headers: { 'Content-Type': 'application/json' },
                data: 
                {
                    userName: data.userName,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email : data.email,
                    password : data.password,
                    phone: data.phone, 
                    imageUrl : data.imageUrl
                }
        })
        .then(function () {
                // handle success
            navigate('signup') 
            
            })
        .catch(function (error) {
                // handle error
        alert(error.message);
        });
    };

    return (
        <div className="bloc-profilUser">
            <br />
            <h2>Compte Utilisateur</h2>
            
            <p>Mettre à jour les informations de son profil :</p>
            <br />
            <form onSubmit={handleClick} name = "count-user">
                <div className="input-container">
                    <label for="file" className='label-file'>Photo de profil</label><br></br>
                    <input className = "input-file" aria-describedby="Image" onChange = {handleInfoChange} type="file" placeholder="Photo de profil" defaultValue={data.imageUrl} />
                </div>
                <div className="input-container">
                    <label>Nom d'utilisateur</label><br></br>
                    <input className = "input-form-box" aria-describedby="UserName" onChange = {handleInfoChange} type="text" placeholder="Nom d'utilisateur" defaultValue={data.userName} />
                </div>
                <div className="input-container">
                    <label>Prénom</label><br></br>
                    <input className = "input-form-box" aria-describedby="FirstName" onChange = {handleInfoChange} type="text" placeholder="Prénom" defaultValue={data.firstName} />
                </div>
                <div className="input-container">
                    <label>Nom</label><br></br>
                    <input className = "input-form-box" aria-describedby="LastName" onChange = {handleInfoChange} type="text" placeholder="Nom" defaultValue={data.lastName} />
                </div>
                <div className="input-container">
                    <label>Email</label><br></br>
                    <input className = "input-form-box" aria-describedby="Email" onChange = {handleInfoChange} type="text" placeholder="Email" defaultValue={data.email} />
                </div>
                <div className="input-container">
                    <label>Téléphone</label><br></br>
                    <input className = "input-form-box" aria-describedby="Phone Number" onChange = {handleInfoChange} type="number" placeholder="Téléphone" defaultValue={data.phone} />
                </div>
                <div className="input-container">
                    <button className='btn' onClick={routePutChange}>Mettre à jour</button>
                    <button className='btn' onClick={routeDeleteChange}>Supprimer mon profil</button>
                </div>
                
            </form>

        </div>
    );
}