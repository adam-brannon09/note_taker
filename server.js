//Import Express then Initiate It
const express = require('express');
const app = express();

//File System and Path modules
const fs = require('fs');
const path = require('path');

//Set up the paths and store in variables for easier to read syntax
const indexPage = path.join(__dirname, './public/index.html');
const notesPage = path.join(__dirname, './public/notes.html');
const notePath = path.join(__dirname, './db/db.json');

//Designate The Port
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//HTML ROUTES//

//GET Route that takes you to index.html
app.get('/', (req, res) => {
    res.sendFile(indexPage)
});

//GET Route that takes you to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(notesPage)
});

//API ROUTES//

// GET Route that reads the db.json file and returns all saved notes from the db
app.get('/api/notes', (req, res) => {
    fs.readFile(notePath, 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        console.log(notes);
        res.json(notes);
    });
});

//Post route that saves the user input to the db.json file
app.post('/api/notes', (req, res) => {
    //Get the info from the request body
    const newNote = req.body;
    //Add a unique id to the note
    newNote.id = Math.floor(Math.random() * 10000);
    fs.readFile(notePath, 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        //.push() adds the new note to the bottom of the notes array
        notes.push(newNote);
        fs.writeFile(notePath, JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

//Delete route that deletes the note with the specified id
app.delete('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile(notePath, 'utf8', (err, data) => {
        if (err) throw err;
        //The notes variable cant be const because we are reassigning it. I found this out the hard way.
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== id);
        fs.writeFile(notePath, JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(notes);
        });
    });
});

//GET Route that takes you to index.html
/* The code will first match the '*' wildcard character to the path that is requested by the client.
 If the path matches the * wildcard character, the code will then send the index.html file to the client.
 This also has to be the last route listed or else it breaks the code. I also found this out the hard way*/
app.get('*', (req, res) => {
    res.sendFile(indexPage)
});

//Start the server on port 3001
app.listen(PORT, () => console.log(`Note Taker App listening on port ${PORT}!`))