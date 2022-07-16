const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt= require('bcrypt');

const userSchema = mongoose.Schema({
    pseudo: {
        type: String,
        minLenght: 3,
        maxLenght: 55,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        max: 1032,
        minLenght: 6,
        maxLenght: 10,
    },
    picture: {
        type: String,
        default: "./uploads/profil/random-user.png"
    },
    bio: {
        type: String,
        max: 1024,
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    },
    likes: {
        type: [String]
    }
},
    {
        timestamps: true,
    }
);

//play function before save into display: 'block',
userSchema.pre("save", async function(next) {
    const salt =  await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.plugin(uniqueValidator);
userSchema.statics.login = async function(email,password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email')
}

module.exports = mongoose.model('user', userSchema);