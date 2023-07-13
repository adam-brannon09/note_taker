const path = require('path');
const router = require('express').Router();
const indexPage = path.join(__dirname, '../public/index.html');
const notesPage = path.join(__dirname, '../public/notes.html');

//GET Route that takes you to index.html
router.get('/', (req, res) => {
    res.sendFile(indexPage)
});

//GET Route that takes you to notes.html
router.get('/notes', (req, res) => {
    res.sendFile(notesPage)
});

module.exports = router;