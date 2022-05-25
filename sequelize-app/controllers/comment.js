//___________________________Création des "controllers" pour les posts____________________//
// Importation du modèle d'un post
const Post = require('../models').Post
const Comment = require('../models').Comment
const User = require('../models').User

// controller pour créer un commentaire     
exports.createComment = async (req, res, next) => {
  // éléments de la requète
  const content =  req.body.content;
  // vérification que tous les champs sont remplis
  if( content === null || content === '')
  {
      return res.status(400).json({error, message: "Merci d'écrire votre commentaire avant de l'envoyer."});
  }
  const commentObject = req.body;
  // Création d'un nouvel objet commentaire
  const comment = new Comment({...commentObject});
  // Enregistrement de l'objet commentaire dans la base de données
  comment.save()
    .then(() => res.status(201).json({ message: 'Le commentaire a été créé !'}))
    .catch(error => res.status(400).json({ error }))
};
// controller pour modifier un commentaire
exports.modifyComment = (req, res, next) => {
  // éléments de la requète
  const content =  req.body.content;
  // vérification que tous les champs sont remplis
  if(content === null || content === '') {
      return res.status(400).json({message: "Veuillez renseigner le champ."});
  }
  const commentObject = req.body;
  Comment.update({ ...commentObject}, { where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: "Le commentaire a été modifié avec succès !"}))
  .catch(error => res.status(400).json({ error, message:" Le commentaire n'a pas été modifié !" }))
}
// controller pour trouver tous les commentaires d'un utilisateur
exports.getByPostId =(req, res, next) => 
{
  Comment.findAll({where:{userId: req.body.UserId}},{where:{postId: req.body.PostId}})
  .then(commentByPostId => {res.status(200).json(commentByPostId)})
  .catch(error => res.status(404).json({ error, message: "Aucun commentaire correspondant à cet utilisateur n'a été trouvé." }));
}
// controller pour trouver un article
exports.findOneComment = (req, res, next) => {
  Comment.findOne({ where: {id: req.params.id} })
  .then(comment => {res.status(200).json(comment)})
  .catch(error => res.status(404).json({ error, message:"Le commentaire n'a pas été trouvé."}));
};
// controller pour trouver tous les commentaires
exports.findAllComments = (req, res, next) => {
  Comment.findAll({
    include : {
      model : Post,
      attributes : ["id","title","content", "imageUrl"]
    },
    order: [['createdAt', 'DESC']]},
    {
      include : {
        model : User,
        attributes : ["id","imageUrl","userName"]
      },
      order: [['createdAt', 'DESC']]})
  .then(comments => {res.status(200).json(comments)})
  .catch(error => res.status(400).json({error, message:"Aucun commentaire n'a été trouvé."} ));
};
// controller pour supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  Comment.destroy({where: {id: req.params.id}})
      .then(() => res.status(200).json({ message: "Le commentaire a été supprimé avec succès !"}))
      .catch(error => res.status(400).json({error, message:"Le commentaire n'a pas été supprimé."}))
};
// controller pour supprimer tous les commentaires d'un utilisateur
exports.deleteAllComments = (req, res, next) => 
{
  Comment.destroy({where:{userId: req.body.UserId}})
    .then(() => res.status(200).json({ message: "Tous vos commentaires ont été supprimés !"}))
    .catch(error => res.status(400).json({error, message:"Nous n'avons pas pu supprimer vos commentaires."}))
};
// contrôleur dédié à l'administrateur pour supprimer un article
exports.adminDeletePost = (req, res, next) => 
{
  Comment.destroy({where: {id: req.params.id, isAdmin : true}})
  .then(() => res.status(200).json({message: "Vous avez supprimé le commentaire de l'utilisateur"}))
  .catch(error => res.status(400).json({ error, message: "Le commentaire n'a pas été supprimé."}))
};