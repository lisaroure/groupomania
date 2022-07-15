const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
});

module.exports = mongoose.model('Thing', thingSchema);