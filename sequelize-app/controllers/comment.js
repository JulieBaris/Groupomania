const Comment = require('../models').Comment

module.exports = {

    // create comment
    addComment: (req, res, next) => {
       //let {firstName, lastName, comment, like, dislike, userlike, userdislike} = req.body
       Comment.create({ ...req.body})
       .then((comment) => {
           return res.status(201).json({
               message: "le commentaire a été créé avec succès!",
               comment
           })
           .catch(err => {
               return res.status(400).json({err, message:"le commentaire n'a pas été créé!"})
           })
       })
    },

    updateComment: (req, res, next) => {
    // let {firstName, lastName, comment, like, dislike, userlike, userdislike} = req.body
        let id = req.params.id

        Comment.findOne({
            where: {id:id}
        }).then(comment => {
            if (comment){
               comment.update({... req.body})
                .then((updateComment) => {
                    return res.status(202).json({
                        message: "le commentaire a été mis à jour.",
                        updateComment
                    })
                })
            }else{
                return res.status(206).json({
                    message: "le commentaire n'a pas été trouvé."
                })
            }
        }).catch(error => {
            return res.status(400).json({
               error,
               message : "Une erreur est survenue."
            })
        })
    },


    // get all comments

    getAllComments: ( req, res, next ) => {

     Comment.findAll( {
            attributes: ['id', 'firstName', 'lastName', 'comment', 'like','dislike', 'userlike', 'userdislike'],
            limit: 40,
            order: [['id', 'DESC']]
        }).then(comments => {
            return res.status(200).json({
                comments,
                message:"tous les commentaires ont été trouvés !"
            })
        }).catch(err => {
            return res.status(400).json({err, message:"aucun commentaire n'a été trouvé."})
        })
    },

    // get single comment by id

    getSingleComment:(req, res, next) => {
        let id = req.params.id

        Comment.findByPk(id)
        .then((comment) => {
            return res.status(200).json({comment, message:"le commentaire a été trouvé."})
        }).catch(err => {
            return res.status(400).json({err, message:"le commentaire n'a pas été trouvé!"})
        })
    },

     // delete comment by id

     deleteSingleComment: (req, res, next) => {
     let id = req.params.id

     Comment.destroy({
          where: {id: id}
     }).then(() =>{
          return res.status(200).json({
               message: "Le commentaire a été supprimé."
          })
     }).catch(err =>{
          return res.status(400).json({err, message:"le commentaire n'a pas été supprimé."})
     })

     },

     // delete all users

     deleteAllComments: (req, res, next) => {
          Comment.destroy({
          truncate: true
          }).then(() => {
          return res.status(200).json({
               success: true,
               message: "Tous les commentaires ont été supprimés"
          })
          }).catch(err => {
               return res.status(400).json({err, message:"les commentaires n'ont pas été supprimés."})
          })
     }

}