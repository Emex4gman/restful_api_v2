    var express = require("express");
    var jwt = require("jsonwebtoken");
    var app = express();

    var User = require('../models/user.model.js');
    var middleware = require("../middlewear/middlewear.index");
 
 
    //signUP in form
    app.get("/signup", (req, res)=>{
        res.render("../views/signup")
    });

    app.post("/signup", (req, res)=>{
        var newUser = new User ({username:req.body.username,
        email: req.body.email});
        //save new user to databae
        User.create(newUser, (err, user)=>{
            if(err){
                res.redirect("/signup")
            }else{
                res.json({
                    user
                });
                console.log("new user saved to database");
            }
        });
    });


    // app.get("/login", (req, res) =>{
    //     res.json({
    //         message: "get your token here"
    //     });
    // });

     //log in form
     app.get("/login", (req, res)=>{
        res.render("../views/login");
    })

    app.post("/login", middleware.checkDetails, (req, res)=>{
        // const user = {
        //     username: "dan",
        //     email: "dan@gmail.com"
        //   }
        var user = {
            username: req.body.username,
            email: req.body.email
          }
        
        jwt.sign({user}, "fuckOFFbitch", {expiresIn: "60s"},  (err, token)=>{
            res.json({
                user,
                token
            });
            console.log("Token genetarted for " + user.username)
        });
    });

    module.exports = app;