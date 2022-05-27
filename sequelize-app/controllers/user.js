//___________________________Création des "controllers" pour l'user____________________//
//Importation des model User, Post, Comment et Like
const User = require('../models').User
const Post = require('../models').Post
const Comment = require('../models').Comment

module.exports = {
  
  // Controllers pour retrouver tous les profils
  getAllProfils:(req, res, next) => 
  {
    User.findAll({order: [['createdAt', 'DESC']]})
      .then(users => { return res.status(200).json({users, message:"Tous les utilisateurs ont été trouvés."})})
      .catch(err => {return res.status(400).json({err, message:"Aucun utilisateur n'a été trouvé."})})
  },
  // Controllers pour retrouver un profil en particulier
  getSingleProfil:(req, res, next) => 
  {
    User.findOne({ where: {id: req.params.id} }, {})
    .then(user => {res.status(200).json(user)})
    .catch(error => res.status(404).json({ error, message:"L'utilisateur recherché n'a pas été trouvé." }));
  },
  // Mise à jour du compte utilisateur
  updateProfil: (req, res, next) => 
  {
    // éléments de la requète
    const firstname = req.body.firstname;
    const lastname =  req.body.lastname;
    const userName = req.body.userName;
    const email =  req.body.email;
    const phone = req.body.phone;
    const imageUrl =  req.body.imageUrl;

    // vérification que tous les champs sont remplis
    if(firstname === null || firstname === '' || lastname === null ||lastname === '' || userName === null || userName === ''
    || email === null || email === '' || phone === null || phone === '' || imageUrl === null || imageUrl === ''   )
    {
        return res.status(400).json(error={ message: "Tous les champs du formulaire doivent être remplis "});
    }
    User.update({ ...req.body, id:  req.params.id}, { where: {id: req.params.id} })
    .then(() => res.status(200).json({ message: "L'utilisateur a été modifié avec succès !"}))
    .catch(error => res.status(400).json({ error, message:"L'utilisateur n'a pas modifié son profil." }));
},

  // Controllers pour supprimer un profil en particulier
  deleteSingleProfil: (req, res, next) => 
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
}