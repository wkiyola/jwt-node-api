const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    ()=> console.log('connected to db')
    );

const authRoute = require('./routes/auth');
app.use(express.json())
app.use('/api/user', authRoute);

app.listen(4000, ()=> console.log('server is running on port 4000'));