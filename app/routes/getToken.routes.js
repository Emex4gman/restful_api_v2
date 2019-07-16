module.exports = (app) => {
    var jwt = require("jsonwebtoken");

    app.get("/login", (req, res) =>{
        res.json({
            message: "get your token here"
        });
    });

    app.post("/login", (req, res)=>{
        const user = {
            username: "dan",
            email: "dan@gmail.com"
          }
        // const user = {
        //     username: req.body.username,
        //     email: req.body.email
        //   }
        
        jwt.sign({user}, "fuckOFFbitch",  (err, token)=>{
            res.json({
                user,
                token
            });
        });
    });
}