const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

//ROUTES
const authRoute = require('./routes/auth');
const taskRoute = require('./routes/tasks');

dotenv.config();

mongoose.connect(
    process.env.MONGO_DB,
    { useNewUrlParser: true , useUnifiedTopology: true},
    () => console.log("Connected to DB"));

const app = express();

// Middlewares
app.use(express.static(path.join(__dirname,'client/dist')));
app.use(bodyParser.json());

app.use('/api/user', authRoute);
app.use('/api/tasks', taskRoute);


app.get('*',(req,res)=> {
    res.sendFile(path.join(__dirname,'client/dist/index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening at Port ${PORT}`)
});