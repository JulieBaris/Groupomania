const getAuthUserIdToken = require("../middleware/getAuthUserId");

module.exports = (req, res, next) => {
    // on récupère l'userId dans la requête
    const userId = req.body.id;
   // On récupère les headers dans la requête
    const reqAuthorization = req.headers.authorization;
    try 
    {
        // Si l'autorisation n'est pas présente dans le headers, alerte
        if (!reqAuthorization) throw new Error("Problème d'authentification");
        // On vérifie si l'userId envoyé avec la requête est le même que celui encodé du token
        if (userId && userId !== getAuthUserIdToken(req)) throw new Error("userId est invalide");
        next();
    }
    catch (error) 
    {
        res.status(401).json({error, message:'une erreur est survenue'});
    }
};

