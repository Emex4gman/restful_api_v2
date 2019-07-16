var jwt = require("jsonwebtoken");

var middlewareObj = {};

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token

middlewareObj.verifytoken = function(req, res, next) {
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

module.exports = middlewareObj