//Import Express
const express = require('express');
const app = express();

//Import Path
const fs = require('fs');
const path = require('path');
//Set up the paths and store in variables for easier to read syntax
const notePath = path.join(__dirname, './db/db.json');


//Designate The Port
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//API Routes
//GET Route that takes you to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});
//GET Route that takes you to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// GET Route that reads the db.json file and returns all saved notes from the db
app.get('/api/notes/', (req, res) => {
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
    newNote.id = Math.floor(Math.random() * 1000);
    fs.readFile(notePath, 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(notePath, JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});










//Start the server on port 3001
app.listen(PORT, () => console.log(`Note Taker app listening on port ${PORT}!`))