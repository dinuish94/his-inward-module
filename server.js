const express = require('express');
var app = express();

app.use('/app', express.static(__dirname + "/public"));
app.use('/app/modules', express.static(__dirname + "/node_modules"));
app.use('/app/modules', express.static(__dirname + "/bower_components"));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/app/*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/data', function (req, res) {
    $x = [{
        "id": 860,
        "firstName": "Superman",
        "lastName": "Yoda"
    }, {
        "id": 870,
        "firstName": "Foo",
        "lastName": "Whateveryournameis"
    }, {
        "id": 590,
        "firstName": "Toto",
        "lastName": "Titi"
    }, {
        "id": 803,
        "firstName": "Luke",
        "lastName": "Kyle"
    }];
    res.send($x);
})


app.listen(3000);

console.log("App is running on port 3000");



