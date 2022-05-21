//__________________________________Gestion de l'authentification__________________________//
// Import du package dans le middleware
const jwt = require("jsonwebtoken"); // Vérifie les tokens

module.exports = (req, res, next) => {
    try {
        // Extraire le token du header Authorization de la requête entrante (qui est après Bearer espace)
        const token = req.headers.authorization.split(" ")[1];
        // Décoder notre token en le vérifiant
        const decodedToken = jwt.verify(token, "SECRET_KEY_123");
        // Extraire l'ID utilisateur de notre token
        const userId = decodedToken.id;
        // Si la requête contient un identifiant userID
        // Si après comparaison, il ne correspond pas à celui extrait du token
        if (req.body.id && req.body.id !== userId) {
            throw "User ID non valable !";
            // Si après comparaison, il  correspond à celui extrait du token
        } else {
            // L'utilisateur est authentifié (tout fonctionne)
            console.log("User ID valable !");
            next();
        }
    } catch {
        // Toutes les erreurs générées
        res.status(401).json({ error: new Error("Requête non authentifiée !") });
    }
};