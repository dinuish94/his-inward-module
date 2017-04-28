const express = require('express');
var app =  express();

app.use('/app',express.static(__dirname + "/public"));
app.use('/app/modules',express.static(__dirname + "/node_modules"));
app.use('/app/modules',express.static(__dirname + "/bower_components"));


app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/app/*', function(req,res){
    res.sendFile(__dirname + '/public/index.html');
});


app.listen(3000);

console.log("App is running on port 3000");



