//___________________________Création des "controllers" pour les posts____________________//
// Importation du modèle d'un post
const Post = require('../models').Post
const Comment = require('../models').Comment
const User = require('../models').User

// controller pour créer un commentaire     
exports.createComment = async (req, res, next) => {
  // éléments de la requète
  const commentObject = req.body;
  // Création d'un nouvel objet commentaire
  const comment = new Comment({...commentObject});
  // Enregistrement de l'objet commentaire dans la base de données
  comment.save()
    .then(() => res.status(201).json({ message: 'Le commentaire a été créé !'}))
    .catch(error => res.status(400).json({ error , message: "Le commentaire n'a pas été créé !"}))
};

// controller pour trouver tous les commentaires liés à un article
exports.findAllComments = (req, res, next) => {
  console.log('Body',req.body)
  Comment.findAll(
    { where :{ postId : req.body.id},
    include :[User],   
    order: [['createdAt', 'DESC']]
    }, { where :{ postId : req.body.id},
    include :[Post],   
    order: [['createdAt', 'DESC']]
    } )
  .then(comments => {res.status(200).json(comments)})
  .catch(error => res.status(400).json({error, message:"Aucun commentaire n'a été trouvé."} ));
};
// controller pour supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  Comment.destroy({where: {id: req.params.id}})
      .then(() => res.status(200).json({ message: "Le commentaire a été supprimé avec succès !"}))
      .catch(error => res.status(400).json({error, message:"Le commentaire n'a pas été supprimé."}))
};
// controller pour trouver un commentaire
exports.findOneComment = (req, res, next) => {
  Comment.findOne({ where: {id: req.params.id} })
  .then(comment => {res.status(200).json(comment)})
  .catch(error => res.status(404).json({ error, message:"Le commentaire n'a pas été trouvé."}));
};