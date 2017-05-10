
const bodyParser = require('body-parser'),
    express = require('express'),
    mongoose = require('mongoose');
const app =  express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/wards', err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});

mongoose.connect('mongodb://localhost:27017/prescriptions', err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});

app.use('/app',express.static(__dirname + "/public"));
app.use('/app/modules',express.static(__dirname + "/node_modules"));
app.use('/app/modules',express.static(__dirname + "/bower_components"));

mongoose.Promise = global.Promise;

require('./server/ward/ward.model.js');
require('./server/bed/bed.model.js');
require('./public/server/prescription/prescription.model.js');
const WardRouter = require('./server/ward/ward.route.js');
const presRouter = require('./public/server/prescription/prescription.route.js');


app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/index.html');
});


app.use('/prescriptions', presRouter);

app.get('/data',(req,res)=>{
    res.send([{
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
}
]);
});

app.use('/wards', WardRouter);

app.get('/app/*', function(req,res){
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000);

console.log("App is running on port 3000");



