const Comment = require('../models/comment').Comment

module.exports = {

    findAllComments:(req, res, next) => {
        Comment.findAll({where: {articleId: req.params.id}})
        .then(comments => {
            console.log(comments);
            res.status(200).json({data: comments});
        })
        .catch(error => res.status(400).json({ error }));
      },

      findOneComment : (req, res, next) => {
        Comment.findOne({ where: {id: req.params.id}})
        .then(comment => {
          console.log(comment);
          res.status(200).json(comment)
        })
        .catch(error => res.status(404).json({ error }));
      },

      createComment : (req, res, next) => {

        const commentObject = req.body;
        // Création d'un nouvel objet commentaire
        const comment = new Comment({
          ...commentObject
        });
        // Enregistrement de l'objet commentaire dans la base de données
        comment.save()
        .then(() => {
          Comment.findAll({
            where: {articleId: req.body.articleId}
          })
          .then((comments) => {
            res.status(200).json(comments);
          })
        })
        .catch(error => res.status(400).json({ error }));
      },

      deleteComment : (req, res, next) => {
        Comment.destroy({ where: {id: req.params.id} })
          .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      }

}