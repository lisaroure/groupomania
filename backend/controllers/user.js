const User = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;

// Afficher tous les utilisateurs
exports.getAllUsers = async (req, res, next) => {
    const users = await User.find().select('-password');
    res.status(200).json(users);
}

// Afficher les infos d'utilisateur
exports.userInfos = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    User.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknown :' + err);
    }).select('-password');
};

// Mettre à jour le profil utilisateur
exports.updateUser = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: req.body.bio,
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)

    try {
        await User.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted." });
    } catch (err) {
        return res.status(500).json({ message: err });
    }

    // Follow user
    exports.follow =  (req, res, next) => {
        if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
            return res.status(400).send('ID unknown :' + req.params.id);

        try {
            //Ajout à la liste de followers
             User.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { following: req.body.idToFollow } },
                { new: true, upsert: true },
                (err, docs) => {
                    if (!err) res.status(201)(docs);
                    else return res.status(400).json(err);
                }
            );
            // Ajout à la liste de following
             User.findByIdAndUpdate(
                req.body.idToFollow,
                { $addToSet: { followers: req.params.id } },
                { new: true, upsert: true },
                (err, docs) => {
                    //if (!err) res.status(201)(docs);
                    if (err) return res.status(400).json(err);
                }
            );
        } catch (err) {
            return res.status(500).json({ message: err });
        }

        // Unfollowed user
        exports.unfollow =  (req, res, next) => {
            if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToUnfollow))
                return res.status(400).send('ID unknown :' + req.params.id)
            try {
                 User.findByIdAndUpdate(
                    req.params.id,
                    { $pull: { following: req.body.idToUnfollow } },
                    { new: true, upsert: true },
                    (err, docs) => {
                        if (!err) res.status(201)(docs);
                        else return res.status(400).json(err);
                    }
                );
                // Ajout à la liste de following
                 User.findByIdAndUpdate(
                    req.body.idToUnfollow,
                    { $pull: { followers: req.params.id } },
                    { new: true, upsert: true },
                    (err, docs) => {
                        //if (!err) res.status(201)(docs);
                        if (err) return res.status(400).json(err);
                    });
            } catch (err) {
                return res.status(500).json({ message: err });
            }
        }
    }
}
