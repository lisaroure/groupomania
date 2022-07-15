const mongoose = require('mongoose');

mongoose.
connect(
    "mongodb+srv://" + process.env.DB_USER_PASS + "@clustergroupo.sp36ykj.mongodb.net/Groupomania",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
