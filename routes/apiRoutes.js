// Express router
const router = require('express').Router();
// fs and path module
const fs = require('fs');
const path = require('path');
// db path stored in a variable for easier to read syntax
const notePath = path.join(__dirname, '../db/db.json');

// GET Route that reads the db.json file and returns all saved notes from the db
router.get('/api/notes', (req, res) => {
    fs.readFile(notePath, 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// Post route that saves the user input to the db.json file
router.post('/api/notes', (req, res) => {
    // Get the info from the request body
    const newNote = req.body;
    // Add a unique id to the note so it can be deleted later
    newNote.id = Math.floor(Math.random() * 10000);
    fs.readFile(notePath, 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        // .push() adds the new note to the bottom of the notes array
        notes.push(newNote);
        fs.writeFile(notePath, JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

// Delete route that deletes the note with the specified id
router.delete('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile(notePath, 'utf8', (err, data) => {
        if (err) throw err;
        // The notes variable cant be const because we are reassigning it. I found this out the hard way.
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== id);
        fs.writeFile(notePath, JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(notes);
        });
    });
});
// Export the router
module.exports = router;