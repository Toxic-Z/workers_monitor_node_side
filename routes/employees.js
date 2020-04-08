var express = require('express');
var router = express.Router();
var employeeSch = require('./../schemas/employee');
const mongoose = require("mongoose");
const Employee = mongoose.model("employee", employeeSch);
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get("/", function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    Employee.find({}, function(err, users){
        if(err) return console.log(err);
        res.send(users)
    });
});

router.delete('/:id', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.params.id)
    const id = req.params.id;
    Employee.findOne({_id: id}, function(err, user){
        if(err) return console.log(err);
        res.send(true);
    });
});


module.exports = router;
