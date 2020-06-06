const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation , loginValidation} = require('../validation');

// Register User
router.post('/register', async (req,res) => {

    // Validate user data before we create user
    const {error} = registerValidation(req.body);
    if(error) res.status(400).send(error.details[0].message);

    // Check if user already exists
    const userExists = await User.findOne({ email : req.body.email });
    if(userExists) return res.status(400).send('Email already exists');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user object
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    });

    console.log(user);

    // Save the user object to DB
    try{
        const savedUser = await user.save();
        res.send({ user : savedUser , token : jwt.sign({_id : user._id}, process.env.TOKEN_SECRET) });
    }catch(err){
        res.status(400).send(err);
    }
});

// Login User
router.post('/login', async (req,res) => {

    // Validate user data before we login user
    const {error} = loginValidation(req.body);
    if(error) res.status(400).send(error.details[0].message);

    // Check if user already exists
    const user = await User.findOne({ email : req.body.email });
    if(!user) return res.status(400).send('Email doesnot exists');

    // Validate Password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid Password");

    // Create and assign a token
    const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET);
    res.header('authToken', token).send({user : user , token : token });
});

module.exports = router;