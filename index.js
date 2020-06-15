const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

//import routes
const authRoute = require('./routes/auth');
const noteRoute = require('./routes/notes');
const documentRoute = require('./routes/document')


//connect to db
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => console.log('database connect. check error ' + err));

//middleware

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//route middleware
app.use('/api/user/', authRoute);
app.use('/api/notes/', noteRoute);
app.use('/api/document/', documentRoute);



app.listen(3000, () => console.log('server running'));