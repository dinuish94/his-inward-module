const express = require('express'),
    app = express(),
    path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
const routes = require('./routes.js')(app);

app.listen(3000, () => {
    console.log("The server is running in port 3000");
});




