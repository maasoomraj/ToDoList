const router = require('express').Router();
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
// const verify = require('./verifyToken');

router.post('/addTask', async (req,res) => {

    // Set userId to _id of user
    let userId;
    try{
        userId = jwt.verify(req.body.userId , process.env.TOKEN_SECRET)._id;
    }catch(err){
        res.status(400).send("Invalid Token");
    }

    // Create a new task object
    const task = new Task({
        description : req.body.description,
        comments : req.body.comments,
        startTime : req.body.startTime,
        endTime : req.body.endTime,
        typeTask : req.body.typeTask,
        userId : userId,
        status : req.body.status
    });

    console.log(task);

    // Save the task object to DB
    try{
        const savedTask = await task.save();
        res.send({ task : savedTask});
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/viewTask', async (req,res) => {

    console.log(req.body);

    // Derive _id of user from token
    let userId;
    try{
        userId = jwt.verify(req.body.userId , process.env.TOKEN_SECRET)._id;
    }catch(err){
        res.status(400).send("Invalid Token");
    }

    console.log(userId);

    let task = [];
    if(!req.body.typeTask){
        // If typetask is not given return all tasks
        task = await Task.find({ userId : userId });
        console.log(task);
        res.send({ tasks : task});
    }
    else{
        // If typetask is given return tasks of type typeTask
        const task = await Task.find({ userId : userId , typeTask : req.body.typeTask });
        console.log(task);
        res.send({ tasks : task});
    }
});

router.post('/update', async (req,res) => {

    console.log(req.body);

    // Derive _id of user from token
    let userId;
    try{
        userId = jwt.verify(req.body.userId , process.env.TOKEN_SECRET)._id;
    }catch(err){
        res.status(400).send("Invalid Token");
    }

    const { _id , status } = req.body;
    console.log( "id - " + _id );
    const task = await Task.findOne({ _id : _id });

    try{
        await task.updateOne({ status : status});
        res.send({ task : task });
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/delete', async (req,res) => {

    console.log(req.body);

    // Derive _id of user from token
    let userId;
    try{
        userId = jwt.verify(req.body.userId , process.env.TOKEN_SECRET)._id;
    }catch(err){
        res.status(400).send("Invalid Token");
    }

    const { _id } = req.body;
    console.log( "id - " + _id );

    try{
        await Task.findOneAndDelete({ _id : _id });
        res.send({ deleted : true });
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;