import '../styles/index.scss'
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

export default function UserPersonalInfo() {
    const[indCustInfo, setIndCustInfo] = useState({
        firstName: "",
        lastName:"",
        phone:"",
        imageUrl:''
    });

    const handleInformationChange = (event) => {
        setIndCustInfo((prevalue) => {
            return {
                ...prevalue,
                [event.target.name]: event.target.value
            }
        })
    };

    function handleClick(event) {
        event.preventDefault();
    }

    let navigate = useNavigate();
    const routeChange = () =>{
        let path = '/profil';
        navigate(path);
    };


    return (
        <div className="container">
            <h1>User Profile</h1>

            <form onSubmit={handleClick} name = "information">

                <div className="input-container">
                    <label>First Name</label>
                    <input className = "input-form-box" onChange = {handleInformationChange}
                           type="text" placeholder="Prénom" defaultValue={indCustInfo.firstName} />
                </div>
                <div className="input-container">
                    <label>Nom</label>
                    <input className = "input-form-box" onChange = {handleInformationChange}
                           type="text" placeholder="Nom" defaultValue={indCustInfo.lastName} />
                </div>

                {/*change password - another route*/}

                <div className="input-container">
                    <label>Téléphone</label>
                    <input className = "input-form-box" onChange = {handleInformationChange}
                           type="text" placeholder="00 00 00 00 00" defaultValue={indCustInfo.phone} />
                </div>

                <div className="input-container">
                    <label>Photo de profil</label>
                    <input className = "input-form-box" onChange = {handleInformationChange}
                           type="image" alt='photo de profil' placeholder="photo de profil" defaultValue={indCustInfo.imageUrl} />
                </div>
                <button onClick={routeChange}>Submit</button>
            </form>

        </div>
    );
}