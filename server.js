const bodyParser = require('body-parser'),
    express = require('express'),
    mongoose = require('mongoose'),
    flash =require('connect-flash'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    cookieParser = require('cookie-parser'),
    expressValidator = require('express-validator');
const app =  express();


app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended : false});
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());

app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.erro = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


mongoose.connect('localhost:27017/wards', err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});

app.use('/app',express.static(__dirname + "/public"));
app.use('/',express.static(__dirname + "/public"));
app.use('/app/modules',express.static(__dirname + "/node_modules"));
app.use('/app/modules',express.static(__dirname + "/bower_components"));

mongoose.Promise = global.Promise;

require('./server/ward/ward.model.js');
require('./server/ward/internalTransfer.model.js');
require('./server/ward/externalTransfer.model.js');
require('./server/bed/bed.model.js');
require('./server/doctor/doctor.model.js');
require('./server/prescription/prescription.model.js');
require('./server/drug/drug.model.js');
require('./server/patient/patient.model.js');
require('./server/doctor/doctor.model.js');
require('./server/food/food.model.js');
require('./server/diet/diet.model.js');
require('./server/laboratory/labTest.model.js');
require('./server/laboratory/labTestTypes.model.js');
require('./server/operationTheatre/slot.model.js');
require('./server/operationTheatre/theatre.model.js');
require('./server/charts/feverChart.model.js');

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
const feverRouter = require('./server/charts/feverChart.route.js');
const diabeticRouter = require('./server/charts/diabetic.route.js');
const lbRouter = require('./server/charts/liquidBalance.route.js');

app.get('/',ensureAuthenticated, function(req,res){
    res.send({name:'kashif rosen'});
});
const userRouter = require('./user.route.js');

app.get('/app/*',ensureAuthenticated, function(req,res){
    res.sendFile(__dirname + '/public/index.html');
});

function ensureAuthenticated(req,res,next) {
    
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg','You are not logged in');
        res.sendFile(__dirname+'/public/login.html');
    }
}

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
app.use('/fevers',feverRouter);
app.use('/diabetes',diabeticRouter);
app.use('/lBalance',lbRouter);
app.use('/',userRouter);

// app.get('/app/*',ensureAuthenticated, function(req,res){
//     res.sendFile(__dirname + '/public/index.html');
// });

app.listen(3000);

console.log("App is running on port 3000");

module.exports = app;



