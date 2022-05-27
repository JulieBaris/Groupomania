import '../../styles/index.scss'
import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios"

function Comments()
{
     // Récupération du token et de l'id de l'utilisateur
     let { token, userId } = AuthAPI();
     // permet de rediriger l'utilisateur vers la page /articles
     let navigate = useNavigate();
     function routeArticles() 
     {
          navigate('/articles');
     }
     let {id} = useParams()
     // Options pour paramétrer la date
     let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
     //récupération de données relatives aux articles 
     const [comments, setComments] = useState([])
     useEffectAllComments(token, id, userId, setComments);

     //Permet d'insérer le texte dans le DOM
     const inserText = InserDOM(routeArticles, comments, options, navigate, id)
     return inserText
}
 
export default Comments;

//________________________Utils___________________________//
function AuthAPI() {
     let userId = localStorage.getItem('userIsConnected');
     let token = "Bearer " + localStorage.getItem('accessToken');
     return { token, userId };
}
function useEffectAllComments(token, id, userId, setComments) {
     useEffect(() => {
          let endpoints = 'http://localhost:3300/api/comments';
          axios({
               method: 'post',
               url: endpoints,
               headers: {
                    "Content-type": 'application/json',
                    'Authorization': token
               },
               data: {
                    id: id
               }
          })
               .then(res => {
                    if (token !== null && userId !== null) {
                         setComments(res.data);
                         console.log(res.data);
                    }

                    else {
                         alert("Veuillez vous connecter !");
                    }
               }
               )
               .catch(error => {
                    //console.log(error.message);
                    alert(error, "La requête n'a pas pu aboutir");
               });
     }, [token, userId,setComments, id]);
}

function InserDOM(routeArticles, comments, options, navigate, id) {
     return <main className="bloc-cards-comment">
          <div className='bloc-comment'>
               <div className='bloc-btn-comment'>
                    <i className="fa-solid fa-circle-arrow-left"
                         aria-label='retour'
                         onClick={routeArticles}
                         tabIndex={0}
                         name='retour'
                         role="button"></i>
                    <a className="ancre" href='#ancre'><i tabIndex={0}
                         className="fa-solid fa-message"
                         aria-label="commenter"
                         role="button"
                         name="commenter">
                    </i></a>
               </div>
               <h2 className='comment-h2'>Les commentaires</h2>

               {comments.map((comment) => (
                    <div key={comment.id} className='card-comment' tabIndex={0}>

                         <div className='container-comment'>
                              <div className='card-profil-comment'>
                                   {<div className='author-comment'>
                                        <img className='image-profil-comment' src={comment.User.imageUrl} alt={comment.User.userName}></img>
                                        <legend className='author-userName'>{comment.User.userName}</legend>
                                   </div>}
                              </div>
                              <div className='text-comment'>
                                   <div className='time'>
                                        <time className='p-time'>{(new Date()).toLocaleDateString(options, comment.updatedAt, "en-FR")}</time>
                                   </div>
                                   <p className='p-comment'>{comment.content}</p>
                              </div>
                              <div className='container-btn-icone'>
                                   <i className="fa-solid fa-trash-can"
                                        aria-label='supprimer le commentaire'
                                        onClick={function () 
                                             {
                                                  let adminId = localStorage.getItem('adminIsConnected');
                                                  if(adminId === null )
                                                  {
                                                       alert(`Vous n'êtes pas administrateur. Un signalement à faire ? Contactez-nous !`)
                                                  }
                                                  else{navigate(`/deleteComment/${comment.id}`)}
                                             }}
                                        tabIndex={0}
                                        name='supprimer'
                                        role="button">
                                   </i>
                              </div>
                         </div>
                    </div>
               ))}
               <div className='connect'>
                    <button className='btn-commenter' onClick={function () { navigate(`/createComment/${id}`); } }>
                         <i
                              id='ancre'
                              className="fa-solid fa-message"
                              aria-label="commenter"
                              name="commenter">
                         </i>
                         Commentez !
                    </button>

               </div>
          </div>
     </main>;
}
