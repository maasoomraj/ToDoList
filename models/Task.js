const mongoose = require('mongoose');

 const taskSchema = new mongoose.Schema({
    description : {
        type : String,
        required: true
    },
    comments : {
        type : String,
    },
    startTime : {
        type : String,
        required : true
    },
    endTime : {
        type : String,
        required : true
    },
    typeTask : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    }
 });

 module.exports = mongoose.model('Task' , taskSchema);