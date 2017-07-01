
'use strict';

const express = require('express'),
    mongoose = require('mongoose');
const moment=require('moment');

mongoose.set('debug', false);

const patientModel = mongoose.model('Patient');

const Router = express.Router();

Router.get('/', ensureAuthenticated,(req, res) => {
    patientModel.find().then(patients => {
        res.json(patients);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    const newPatient = new patientModel(req.body);
    newPatient.created_at = new Date();
    newPatient.save().then(patients => {
        res.json(patients);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.delete('/:id', (req, res) => {
    patientModel.deleteOne({"pid":req.params.id}).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.put('/:id', (req, res) => {
    console.log(req.params.id)
    patientModel.findOne({ pid: req.params.id }, function (err, reponse) {
        console.log(reponse.data);
        var patient = new patientModel(reponse);
        patient.status = "out";
        patient.dischargeDate=moment().format('MM/DD/YYYY');
        patient.save().then(patients => {
            res.json(patients);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    });
});


// Router.get('/:id', (req, res) => {
//     patientModel.findOne({'id':req.params.id}).then(patient => {
//         res.json(patient || {});
//     }).catch(err => {
//         console.error(err);
//         res.sendStatus(500);
//     });
// });


Router.get('/:id', (req, res) => {
    patientModel.findById(req.params.id).populate('labTests').populate('operations').populate({ 
     path: 'operations',
     populate: {
       path: 'doctor',
       model: 'Doctor'
     } 
  }).exec().then(patient => {
        res.json(patient || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.put('/updatePatient/:id', (req, res) => {
    const data = req.body;
    //delete data._id;
    const query = {"pid":req.params.id};
    patientModel.findOneAndUpdate(query, {$set: data}).then(dataDb => {
        res.status(201).json({success:true});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});


function ensureAuthenticated(req,res,next) {
    
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg','You are not logged in');
        res.send(403);
    }
}

module.exports = Router;