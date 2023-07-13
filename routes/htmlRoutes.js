// Express router
const router = require('express').Router();
// Path module
const path = require('path');
// Set up the paths and store in variables for easier to read syntax
const indexPage = path.join(__dirname, '../public/index.html');
const notesPage = path.join(__dirname, '../public/notes.html');

// GET Route that takes you to index.html
router.get('/', (req, res) => {
    res.sendFile(indexPage)
});

// GET Route that takes you to notes.html
router.get('/notes', (req, res) => {
    res.sendFile(notesPage)
});
// Export the router
module.exports = router;