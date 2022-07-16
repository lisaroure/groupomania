const Post = require('../models/Post');
const fs = require('fs');

// Posts existants
exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then((posts) => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error: error }))
}
// Afficher un seul post
exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error: error }))
}
// Créer une sauce
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Post({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};
// Modifier un post
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?{
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }
Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Message modifié.' }))
    .catch(error => res.status(400).json({ error }))
}
// Supprimer un post
exports.deletePost = (req, res, next) => {
Post.findOne({ _id: req.params.id })
    .then(post => {
        const filename = post.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Post supprimé.' }))
                .catch(error => res.status(400).json({ error: error }))
        })
    })
    .catch(error => res.status(500).json({ error }))
};
// Like utilisateur
exports.likeOrNot = (req, res, next) => {
if (req.body.like === 1) {
    Post.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
        .then((post) => res.status(200).json({ message: 'Like enrigistré !' }))
        .catch(error => res.status(400).json({ error }))
}
// Dislike utilisateur
else if (req.body.like === -1) {
    Post.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
        .then((post) => res.status(200).json({ message: 'Dislike enregistré !' }))
        .catch(error => res.status(400).json({ error }))
} else {
    Post.findOne({ _id: req.params.id })
        // Annuler le like
        .then(post => {
            if (post.usersLiked.includes(req.body.userId)) {
                Post.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                .then((post) => { res.status(200).json({ message: 'Like annulé' }) })
                .catch(error => res.status(400).json({ error }))
        }// Annuler le dislike
        else if (post.usersDisliked.includes(req.body.userId)) {
            Post.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                .then((post) => { res.status(200).json({ message: 'Dislike annulé' }) })
                .catch(error => res.status(400).json({ error }))
        }
    })
}
}