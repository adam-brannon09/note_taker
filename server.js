const express = require('express');
const app = express();
//Designate The Port
const port = 3001;





//
app.listen(port, () => console.log(`Note Taker app listening on port ${port}!`))