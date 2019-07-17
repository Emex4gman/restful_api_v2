module.exports = (app) => {
    var middleware = require("../middlewear/middlewear.index");
    var notes = require('../controllers/note.contoller.js');

    //Create a new note
    app.post('/notes', notes.create);

    //Retrieve all notes
    app.get('/notes', notes.findAll);

    //Retrieve a single note with noteId
    app.get('/notes/:noteId', notes.findOne)

    //Update a Note with noteId
    app.put('/notes/:noteId', middleware.verifytoken, notes.update)

    //Delete a Note with noteId
    app.delete('/notes/:noteId',middleware.verifytoken, notes.delete)
}