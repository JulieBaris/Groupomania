//___________________________Création des "controllers" pour l'user____________________//
// permet de sécuriser l'identification et le compte d'un utilisateur
const bcrypt = require('bcrypt');
// stock temporairement les données 
const {Buffer} = require('buffer')
// permet de créer un tocken et sécuriser l'auth
const { sign } = require("jsonwebtoken");
// importation du model User
const User = require('../models').User

module.exports = {
//Controller "signUp" permet à un nouvel utilisateur de créer un compte
signUp: (req, res, next) => {
    // éléments de la requète
    const userName =  req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    // vérification que tous les champs sont remplis
    if(userName === null || userName === '' || userName < 3 || email === null || email === '' || password === null || password === '') {
        return res.status(400).json(error={message:"Veuillez remplir tous les champs du formulaire"});
    }
    else
    {
      // Masquage de l'adresse mail
        let buff = new Buffer.from(email);
        let emailInbase64 = buff.toString('base64');
        // vérification si l'user existe dans la BDD
        User.findOne({
            attributes: ['email'],
            where: {email: emailInbase64}
        })
        .then((userFound) =>{
        // si l'utilisateur n'existe pas la BDD
        if(!userFound) {
            // Hashage du mot de passe avec bcrypt
            bcrypt.hash(password, 10)
            .then(hash => {
                // Masquage de l'adresse mail
                let buff = new Buffer.from(email);
                let emailInbase64 = buff.toString('base64');

                // Création du nouvel utilisateur
                const user = new User({
                    userName,
                    email: emailInbase64,
                    password: hash
                })
                // Sauvegarde dans la base de données
                user.save()
                .then(() => res.status(201).json({ message: " L'utilisateur a été créé avec succès !"}))
                .catch(error => res.status(400).json(error={"message": "L'utilisateur n'a pas pu être créé !"}));
            })
        } 
        else if(userFound) 
        {
            return res.status(404).json(error={"message": "L'utilisateur existe déjà !"})
        }
    })
    .catch(error => res.status(500).json(error={"message":"Nous n'avons pas pu vous connecter à votre compte." }));
    };
  },
  loginUser: async (req, res, next) => {
    let buff = new Buffer.from(req.body.email);
    let emailInbase64 = buff.toString('base64');

    // Recherche d'un utilisateur dans la base de données
    User.findOne({where: { email: emailInbase64 }})
    .then(user => {
        // Si on ne trouve pas l'utilisateur
        if(!user) {
            return res.status(401).json(error={message: 'Utilisateur non trouvé !'})
        }
        // On compare le mot de passe de la requete avec celui de la base de données
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json(error={message: 'Mot de passe incorrect !'})
            }
            res.status(200).json({
                id: user.id,
                // Création d'un token pour sécuriser le compte de l'utilisateur
                token: sign(
                    { 
                        id: user.id
                    },
                    "SECRET_KEY_123",
                    { expiresIn: '1h' }
                )
            });
        })
        .catch((error) => res.status(500).json(error={message:"Nous n'avons pas réussi à vous identifier !" }));
    })
    .catch((error) => res.status(500).json(error={message:"Aie, un problème a été rencontré !" }));
}
}