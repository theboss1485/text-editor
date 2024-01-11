/* This is the server file.  It  will display the index.html 
page when the corresponding route is called.*/
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/html-routes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
