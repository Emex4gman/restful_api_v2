var express = require("express");
var bodyParser = require("body-parser");

// create express app
var app = express();

// parse rquests of content type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse rquests of content type - application/json
app.use(bodyParser.json())

//config of database
var dbConfig = require("./config/database.config"); // remember to test .js
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connecting to database
// mongoose.connect(dbConfig.url, {useNewUrlParser: true}).then(()=>{
//     console.log("Successfully connected to database");
// }).catch(err =>{
//     console.log("could not connect to database", err);
//     process.exit();
// });

mongoose.connect(dbConfig.url, {useNewUrlParser: true}, (err) =>{
    if(err){
        console.log("could not connect to database");
    }else{
        console.log("Successfully connected to database tooo");
    }
});


// define a simple route
app.get("/", (req, res) => {
    res.json({
        "message" : "welcome to EasyNotes application."
    })
});




//Require Notes routes
require('./app/routes/note.routes')(app);
require("./app/routes/getToken.routes")(app);

app.listen(5000, ()=> {
    console.log("server on 5000")
})