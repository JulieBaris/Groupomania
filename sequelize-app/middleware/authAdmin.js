// Import Utils
// Vérifier les token
const jwt = require('jsonwebtoken');
// masquage des données de la BDD avec dotenv
require('dotenv').config();

// fonction pour l'authentification de l'administrateur
module.exports = (req, res, next) => {
     try {
          // on récupère le token dans le header
          const token = req.headers.authorization.split(' ')[1];
          // on vérifie et on décode le token avec la clé de sécurité
          const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
          // on décode "isAdmin"
          const isAdmin = decodedToken.isAdmin;
          if (isAdmin !== true)
          {
               throw "interdiction d'accès pour les personnes non administrées.";
          } 
          else 
          {
               next();
          }
     } catch 
     {
          res.status(401).json({error});
     }
};