import '../../styles/index.scss'
import React, { useState } from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios"


function EditComment()
{
    // permet de rediriger l'utilisateur vers la page /articles
    let navigate = useNavigate();
    const routeArticles = () =>
    {
        let path = '/articles';
        navigate(path)
    }
    //permet de récupérer l'id de l'utilisateur
    const userId = localStorage.getItem('userId')
    const [user, setUser] = useState()
    axios.get(`http://localhost:3300/api/profil/${userId}`)
    .then(function (response)
    {
         //Si la réponse ne correspond pas, une alerte s'affiche
         if(response.error)
         {
              alert("L'utilisateur n'est pas connecté !")
          }
          //Si la réponse correspond, une alerte s'affiche et l'utilisateur est redirigé vers son compte
          else
          {
               setUser(response.user)
               console.log(response.user)
          }
    })
    .catch()
    
    //permet d'observer l'état des données du commentaire
    const [comment, setComment] = React.useState(
         {
              comment:''
          })
    
    // écoute les changements des valeurs de l'input lorsqu'un utilisateur souhaite modifier son commentaire
    function changeComment(event) 
    {
        const {name, value, type, checked} = event.target
        setComment(prevDataComment => 
          {
               return{
                    ...prevDataComment,
                    [name]: type === "checkbox" ? checked : value
               }
          })
     }
     function handleSubmitComment(event) {
          event.preventDefault()
          console.log(comment)
     }
    // au clique de l'utilisateur, on vérifie son existence(id) et on lui permet de modifier son commentaire
    function SubmitComment(event)
    {
         // suppression des paramètres par défaut
         event.preventDefault()
         //Si l'id de l'utilisateur existe et que les données saisies par l'utilisateur existent
         if(userId !== undefined && comment !== undefined)
         {
              //Avec la méthode Put de Acios, on envoie les données saisies dans la BBD
              axios
              ({
                   method: 'put',
                   url: `http://localhost:3300/api/comment/${userId}`,
                   //headers: {"Authorization" : token},
                   data:
                   {
                        comment : comment.comment
                    }
               })
               .then(function (response)
               {
                    //Si la réponse ne correspond pas, une alerte s'affiche
                    if(response === undefined)
                    {
                         alert("Le commentaire n'a pas été mis à jour !")
                    }
                    //Si la réponse correspond, une alerte s'affiche et l'utilisateur est redirigé vers son compte
                    else
                    {
                         alert("Le commentaire a été mis à jour avec succès ! ");
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
               <button className='btn-return' onClick={routeArticles}><i className="fa-solid fa-circle-arrow-left"></i></button>
          </div>
          <div className='container-comment'>
          <div className='form-comment'>
               <h2 className='comment-h2'>Modifiez votre commentaire</h2>
               <p className='trait'>_____________________</p>
               <form onSubmit={handleSubmitComment} name = "update-comment" className='form-comment'>
                    <div >
                         <img src={user.imageUrl} alt={user.firstName} className='imageUser' />
                         <p className='identity'>{user.userName}</p>
                         <input className = "input-form-box" aria-describedby="comment"  name='comment' onChange = {changeComment} type="text" placeholder="Votre Commentaire" value={comment.comment} />
                    </div>
                    <div >
                         <button className='btn' onClick={SubmitComment}>Mettre à jour</button>
                    </div>
               </form>
               
               </div>
          </div>
     </div>
     );
}
 
export default EditComment;