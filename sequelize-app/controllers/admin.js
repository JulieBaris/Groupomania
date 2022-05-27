//___________________________Création des "controllers" pour l'user____________________//
//Importation des model User, Post, Comment et Like
const User = require('../models').User
const Post = require('../models').Post
const Comment = require('../models').Comment

//contrôleur dédié à l'administrateur pour supprimer un article
exports.adminDeleteProfil = (req, res, next) => 
  {
    Comment.destroy({where: {id: req.body.id}})
    .then(()=> Post.destroy({where: {id: req.params.id}})
    .then(() =>
      {
        User.destroy({where: {id: req.params.id}})
        .then(() => res.status(200).json({message: "Le profil et les publications sont supprimés"}))
        .catch(error => res.status(400).json({ error, message: "Le profil n'a pas été supprimé."}))
      })
    .catch(error => res.status(500).json({error, message:"Une erreur s'est produite."})))
  
  }

// contrôleur dédié à l'administrateur pour supprimer un article
exports.adminDeletePost = (req, res, next) => 
{
  Comment.destroy({where: {id: req.params.id}})
    .then(() => 
      Post.destroy({ where: {id: req.params.id} }, { where: {id: req.body.id} })
      .then(() => res.status(200).json({ message: "L'article a été supprimé avec succès !"}))
      .catch(error => res.status(400).json({error, message:"L'article n'a pas été supprimé."}))
    )
    .catch(error => res.status(500).json({error, message:"Une erreur s'est produite."}))
};

// contrôleur dédié à l'administrateur pour supprimer un article
exports.adminDeleteComment = (req, res, next) => 
{
  Comment.destroy({where: {id: req.params.id}})
  .then(() => res.status(200).json({message: "Vous avez supprimé le commentaire de l'utilisateur"}))
  .catch(error => res.status(400).json({ error, message: "Le commentaire n'a pas été supprimé."}))
};