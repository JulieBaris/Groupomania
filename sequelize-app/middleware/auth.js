//__________________________________Gestion de l'authentification__________________________//
//Importation de jsonwebtoken
const {verify} = require("jsonwebtoken")

//on vérifie le tocken 
const validateTocken =(req, res, next) => {
  const accessTocken = req.header("accessToken")

  //Utilisateur connecté ? 
  if(!accessTocken) return res.json({error : "L'utilisateur n'est pas connecté."})

  try{
        //Tocken valide ? Vérification avec jsonwetocken
      const validTocken = verify(accessTocken, "SECRET_KEY_123")
      req.user = validTocken

      //Tocken validé donc on poursuit la requête
      if(validTocken){
        return next
      }
  }
  catch (err){
    return res.json({error : err})

  }
}

module.exports = {validateTocken}