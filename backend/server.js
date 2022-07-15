const express =  require('express');
const userRoutes = require('./routes/user');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();





//Router
app.use('/api/user', userRoutes);

//Server 
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})