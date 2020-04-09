var express = require('express');
var router = express.Router();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
var employeeSch = require('./../schemas/employee');
var cors = require('cors');
const mongoose = require("mongoose");
const Employee = mongoose.model("employee", employeeSch);
const authConfig = {
    domain: "iamauth.eu.auth0.com",
    audience: "http://localhost:3000/"
};

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `http://${authConfig.domain}/.well-known/jwks.json`,
    }),
    issuer: `https://${authConfig.domain}/`,
    audience: authConfig.audience,
    algorithm: ["RS256"]
});
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.use(cors());
router.use(express.urlencoded());
router.use(express.json());

router.get('/', function(req, res){
    Employee.find({}, function(err, users){
        if(err) return res.status(500).send(err);
        res.status(200).send(users)
    });
});

router.post('/', function (req, res) {
    Employee.create(req.body, function(err, employee){
        if(err) return res.status(500).send(err);
        res.send(employee);
    });
});

router.put('/:id', function (req, res ) {
    Employee.findByIdAndUpdate(req.params.id, req.body, function(err, user){
        if(err) return res.status(500).send(err);
        res.status(201).send(true);
    });
});

router.delete('/:id', function(req, res){
    Employee.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send(err);
        res.status(200).send(true);
    });
});


module.exports = router;
