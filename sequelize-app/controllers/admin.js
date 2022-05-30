//___________________________Création des "controllers" pour l'user____________________//
//Importation des model User, Post, Comment
const User = require('../models').User
const Post = require('../models').Post
const Comment = require('../models').Comment

//contrôleur dédié à l'administrateur pour supprimer un profil
exports.adminDeleteProfil = (req, res, next) => 
  {
    Comment.destroy({where: {id: req.body.id}})
    .then(()=> Post.destroy({where: {id: req.params.id}})
    .then(() =>
      {
        let UserToDelete = User.findOne({ where: {id: req.params.id} })
        if(req.body.adminId !==null || req.body.id === UserToDelete.userId)
        {
          User.destroy({where: {id: req.params.id}})
          .then(() => res.status(200).json({message: "Le profil et les publications sont supprimés"}))
          .catch(error => res.status(400).json({ error, message: "Le profil n'a pas été supprimé."}))
        }
        else
        { return res.status(401).json({message: "Vous n'êtes le détenteur de ce profil, ni administrateur. "})}
      })
    .catch(error => res.status(500).json({error, message:"Une erreur s'est produite."})))  
  }

// contrôleur dédié à l'administrateur pour supprimer un article
exports.adminDeletePost = (req, res, next) => 
{
  Comment.destroy({where: {id: req.params.id}})
   let PostToDelete = Post.findOne({ where: {id: req.params.id} })
    .then(() =>
      {
        if( req.body.adminId !==null || req.body.UserId === PostToDelete.userId )
        {
          Post.destroy({ where: {id: req.params.id} }, { where: {id: req.body.id} })
          .then(() => res.status(200).json({ message: "L'article a été supprimé avec succès !"}))
          .catch(error => res.status(400).json({error, message:"L'article n'a pas été supprimé."}))
        }
        else{ return res.status(401).json({message: "Vous n'êtes ni l'auteur de cet article, ni administrateur. "})}
      }     
    )
    .catch(error => res.status(500).json({error, message:"Une erreur s'est produite."}))
};

// contrôleur dédié à l'administrateur pour supprimer un commentaire
exports.adminDeleteComment = (req, res, next) => 
{
  let CommentToDelete = ({ where : {id : req.params.id}})
  if(req.body.adminId !== null || req.body.userId === CommentToDelete.userId)
  {
    Comment.destroy({ where: {id: req.params.id} }, { where: {id: req.body.id} })
  .then(() => res.status(200).json({message: "Vous avez supprimé le commentaire de l'utilisateur"}))
  .catch(error => res.status(400).json({ error, message: "Le commentaire n'a pas été supprimé."}))
  }
  else{return res.status(401).json({message: "Vous n'êtes ni l'auteur de ce commentaire, ni administrateur. "})}
};