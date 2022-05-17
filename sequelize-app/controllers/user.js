//___________________________Création des "controllers" pour l'user____________________//
// Importation de l'outil bcrypt qui permet de sécuriser l'identification et le compte d'un utilisateur
const bcrypt = require('bcrypt');
// Importation de crypto-js
const cryptojs = require('crypto-js');
// Importation de l'outil "jsonwebtocken", permet de créer un tocken et sécuriser l'auth
const { sign } = require("jsonwebtoken");
//Importation du model User
const User = require('../models').User

module.exports = {
//Controller "signUp" permet à un nouvel utilisateur de créer un compte
signUp: (req, res, next) => {
    // chiffrer l'email 
    const cryptojsEmail = cryptojs.HmacSHA256(req.body.email, 'SECRET_KEY_123').toString();
    // on crypte le mot de passe à 10 reprises pour plus de sécurité   
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        // on crée un nouveau modèle qui prend en compte le cryptage du mot de passe
        let {userName, email, password} = req.body
        User.create({
            userName,
          email: cryptojsEmail,
          password: hash

        })
          .then((user) => res.status(201).json({user,
            message: 'Utilisateur créé !'
          }))
          .catch((e) => res.status(500).json({
            e,
            message: "Impossible de créer un compte. Cette adresse email est déjà utilisée."
          }));
      })
      .catch((e) => res.status(500).json({
        e,
        message: "une erreur est survenue"
      }));
  },
  loginUser: async (req, res, next) => {
    const { email, password } = req.body
    const cryptojsEmail = cryptojs.HmacSHA256(req.body.email, 'SECRET_KEY_123').toString();
    const user = await User.findOne({ where: { email: cryptojsEmail } }) 

    if (!user) { 
      res.json({ error: "L'utilisateur n'existe pas !" })
    } else {
      // On vérifie si les données sont exactes
      bcrypt.compare(password, user.password).then(async (match) => { 
        if (!match) { 
          // On renvoie l'erreur
          res.json({ error: 'Mauvaise combination' }) 
        } else {
          // On crée un token
          const accessToken = sign(
            { email: user.email, id: user.id }, 
            'RANDOM_TOKEN_SECRET', {
              expiresIn: '24h'
            }
          )
          res.json({ token: accessToken, email: cryptojsEmail })
          console.log(user)
        }
      })
    }
  },

  // update account
  updateProfil: (req, res, next) => {
      let { userName, firstName, lastName, email, password, phone, imageUrl} = req.body
      let id = req.params.id
      User.findByPk(id)
      .then( user => {
          if (user){
              user.update({userName, firstName, lastName, email,password,phone,imageUrl})
              .then((updateUser) => {
                  return res.status(202).json({
                      message: "L'utilisateur a mis son profil à jour",
                      updateUser
                    })
                  })
                }
          else {
            return res.status(206).json({message: "L'utilisateur n'a pas été trouvé"})
          }
      }).catch(error => {
          return res.status(400).json({
              error,
              message:"Une erreur est survenue."
          })
      })
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
      let id = req.params.id
      User.findByPk(id)
      .then((user) => {
          return res.status(200).json({user, message:"l'utilisateur a été trouvé avec succès."})
      }).catch(err => {
          return res.status(400).json({err, message:"l'utilisateur n'a pas été trouvé."})
      })
      next
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

  },

  // delete all users

  deleteAllProfils: (req, res) => {
      User.destroy({
          truncate: true
        }).then(() => {
          return res.status(200).json({
              success: true,
              message: "Tous les utilisateurs ont été supprimés."
          })
        }).catch(err => {
            return res.status(400).json({
                err, 
                message:"les utilisateurs n'ont pas été supprimés."
            })
        })
  },

}