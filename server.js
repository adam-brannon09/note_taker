//Import Express then Initiate It
const express = require('express');
const app = express();
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes')
//Path module
const path = require('path');

//Set up the paths and store in variables for easier to read syntax
const indexPage = path.join(__dirname, './public/index.html');

//Designate The Port
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/', apiRoutes);
app.use('/', htmlRoutes);

// GET Route that takes you to index.html
  /* The code will first match the '*' wildcard character to the path that is requested by the client.
  If the path matches the * wildcard character, the code will then send the index.html file to the client.
  This also has to be the last route listed or else it breaks the code. I also found this out the hard way*/
app.get('*', (req, res) => {
    res.sendFile(indexPage)
});

//Start the server on port 3001
app.listen(PORT, () => console.log(`Note Taker App listening on port ${PORT}!`))