//___________________________Création des "controllers" pour l'user____________________//
//Importation des model User, Post, Comment et Like
const User = require('../models').User
const Article = require('../models').Post
const Comment = require('../models').Comment
const Like =  require('../models').Like
// imports de fs
const fs = require('fs');

module.exports = {

  // update account
  updateProfil: (req, res, next) => {
    // éléments de la requète
    const firstname = req.body.firstname;
    const lastname =  req.body.lastname;
    const userName = req.body.userName;
    const email =  req.body.email;
    const phone = req.body.phone;
    const imageUrl =  req.body.imageUrl;
  
    // vérification que tous les champs sont remplis
    if(firstname === null || firstname === '' || lastname === null ||lastname === '' || userName === null || userName === ''
    || email === null || email === '' || phone === null || phone === '' || imageUrl === null || imageUrl === ''   ) {
        return res.status(400).json({'error': "Tous les champs du formulaire doivent être remplis "});
    }
    // gestion d'ajout/modification image de profil
    const userObject = req.file ?
    {
      ...req.body.user,
      imageUrl: req.file.filename
    } : { ... req.body};

    User.update({ ...userObject, id:  req.params.id}, { where: {id: req.params.id} })
    .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
    .catch(error => res.status(400).json({ error }));
      
  },

  // get all users
  getAllProfils:(req, res, next) => {
    User.findAll()
      .then(users => {
          return res.status(200).json({
              users,
              message:"Tous les utilisateurs ont été trouvés."
          })
      })
      .catch(err => {
          return res.status(400).json({err, message:"Aucun utilisateur n'a été trouvé."})
      })
  },

  // get single user by id
  getSingleProfil:(req, res, next) => {
    User.findOne({ where: {id: req.params.id} })
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => res.status(404).json({ error }));
      
  },

  // delete user by id
  deleteSingleProfil: (req, res, next) => {
    let id = req.params.id

      User.destroy({
          where: {id: id}
      }).then(() =>{
          return res.status(200).json({
              message: "Le profil a été supprimé avec succès."
          })
      }).catch(err =>{
          return res.status(400).json({err, message:"l'utilisateur n'a été supprimé."})
      })
  // Like.destroy({where: {userId: req.params.id}})
  // .then(() => 
  //   Comment.destroy({where: {userId: req.params.id}})
  //   .then(() => 
  //     Article.findAll({where: {userId: req.params.id}})
  //       .then(
  //         (articles) => {
  //           articles.forEach(
  //             (article) => {
  //               Comment.destroy({where: {articleId: article.id}})
  //               Like.destroy({where: {articleId: article.id}})
  //               Article.destroy({where: {id: article.id}})
  //             }
  //           )
  //         }
  //       )
  //       .then(() =>
  //       User.findOne({ where: {id: req.params.id} })
  //         .then(user => {
  //           const filename = user.imageUrl;
  //           fs.unlink(`images/${filename}`, () => {
  //             User.destroy({ where: {id: req.params.id} })
  //             .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
  //           })
  //         })
  //       )
  //     )
  //   )
  // .catch(error => res.status(400).json({ error }));
      

  },


}