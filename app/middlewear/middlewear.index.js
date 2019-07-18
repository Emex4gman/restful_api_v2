var jwt = require("jsonwebtoken");
var User = require("../models/user.model")

var middlewareObj = {};

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token

middlewareObj.verifytoken = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
       res.status(403).send({
        message: "THIS IS FORBIDDEN"
      });
    }
  
  }


  //check if the user is stored on our database
  middlewareObj.checkDetails = (req,res,next)=>{
    var inUsername = req.body.username;
    var inEmail = req.body.email;
    var user = {
      username: inUsername,
      email: inEmail
    }
    console.log(inEmail +" and "+ inUsername);
    User.find({username: inUsername}, (err, data)=>{
      // res.json({
      //   data,
      //   user
      // }); 
      if(data[0].username === user.username && data[0].email === user.email){
        return next();
      }else{
        res.json({
          message: "wronge details"
      }); 
      }
    });
 

  } 

module.exports = middlewareObj