const Posts = require('../models/Post');

// Like utilisateur
exports.likeOrNot = (req, res, next) => {
    if (req.body.like === 1) {
        Posts.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
            .then((post) => res.status(200).json({ message: 'Like enrigistré !' }))
            .catch(error => res.status(400).json({ error }))
    }
    // Dislike utilisateur
    else if (req.body.like === -1) {
        Posts.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
            .then((post) => res.status(200).json({ message: 'Dislike enregistré !' }))
            .catch(error => res.status(400).json({ error }))
    } else {
        Posts.findOne({ _id: req.params.id })
            // Annuler le like
            .then(post => {
                if (post.usersLiked.includes(req.body.userId)) {
                    Posts.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                        .then((post) => { res.status(200).json({ message: 'Like annulé' }) })
                        .catch(error => res.status(400).json({ error }))
                }// Annuler le dislike
                else if (post.usersDisliked.includes(req.body.userId)) {
                    Posts.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                        .then((post) => { res.status(200).json({ message: 'Dislike annulé' }) })
                        .catch(error => res.status(400).json({ error }))
                }
            })
    }
}