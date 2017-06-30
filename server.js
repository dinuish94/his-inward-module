
const bodyParser = require('body-parser'),
    express = require('express'),
    mongoose = require('mongoose');
const app =  express();

app.use(bodyParser.json());


mongoose.connect('localhost:27017/wardss', err => {
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
require('./server/doctor/doctor.model.js');
require('./server/prescription/prescription.model.js');
require('./server/drug/drug.model.js');
require('./server/patient/patient.model.js');
require('./server/doctor/doctor.model.js');
require('./server/BHT/labTest.model.js');
require('./server/BHT/labTestTypes.model.js');
require('./server/food/food.model.js');
require('./server/diet/diet.model.js');
require('./server/laboratory/labTest.model.js');
require('./server/laboratory/labTestTypes.model.js');
require('./server/operationTheatre/slot.model.js');
require('./server/operationTheatre/theatre.model.js');

const WardRouter = require('./server/ward/ward.route.js');
const presRouter = require('./server/prescription/prescription.route.js');
const patientRouter = require('./server/patient/patient.route.js');
const BedRouter = require('./server/bed/bed.route.js');
const DoctorRouter = require('./server/doctor/doctor.route.js');
const drugRouter = require('./server/drug/drug.route.js');

const LabRouter = require('./server/laboratory/labTest.route.js');
const LabTypesRouter = require('./server/laboratory/labTestTypes.route.js');
const SlotRouter = require('./server/operationTheatre/slot.route.js');
const TheatreRouter = require('./server/operationTheatre/theatre.route.js');
const foodRouter = require('./server/food/food.route.js');
const dietRouter = require('./server/diet/diet.route.js');

app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/slots', SlotRouter);
app.use('/theatres', TheatreRouter);
app.use('/labTests', LabRouter);
app.use('/labTestTypes', LabTypesRouter);
app.use('/wards', WardRouter);
app.use('/doctors',DoctorRouter);
app.use('/prescriptions', presRouter);
app.use('/drugs',drugRouter);
app.use('/patients',patientRouter);
app.use('/beds', BedRouter);
app.use('/foods',foodRouter);
app.use('/diets',dietRouter);

app.get('/app/*', function(req,res){
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000);

console.log("App is running on port 3000");



