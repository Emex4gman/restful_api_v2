var Note = require('../models/note.model.js');

//Create and save a new Note
exports.create = (req, res) => {
    //validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    } else {
        //creat a note
        var note = new Note({
            title: req.body.title || "Untitled Note",
            content: req.body.content
        });
        //save Note in the database
        note.save({}, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "some error occurred while creating new note"
                });
            } else {
                res.send(data);
            }
        })
    }
    //save Note in the database
    //note.save()
    // .then(data => {
    //     res.send(data);
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "some error occurred while creating new note"
    //     });
    // });
};

//Retrieve and return all the Notes from the database
exports.findAll = (req, res) => {
    Note.find().then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "could not retrevie Notes"
        });
    });
};

//find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found withh id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
};

//update a note identiide by the note in the request
exports.update = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    }
    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitiled Note",
        content: req.body.content
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note  not found with Id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Note  not found with Id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with Id " + req.params.noteId
            });
        });
};

//delete a note with the secified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with the id " + req.params.noteId
                });
            }
            res.send({ message: "note deleted successfully!" });
        }).catch(err => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "Note Not found with the id " + req.params.noteId
                })
            }
            return res.status(500).send({
                message: "could not delet note with id " + req.params.noteId
            })
        })

}