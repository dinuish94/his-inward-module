
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const patientModel = mongoose.model('Patient');

const Router = express.Router();

Router.get('/', (req, res) => {
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
    patientModel.deleteOne({'id':req.params.id}).then(() => {
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
        patient.save().then(patients => {
            res.json(patients);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    });
});

Router.get('/:id', (req, res) => {
    patientModel.findOne({'id':req.params.id}).then(patient => {
        res.json(patient || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.put('/updatePatient/:id',(req,res)=>{
    console.log("the id is "+req.params.id);
    console.log('data are');
    console.log(req.body);
    patientModel.update(req.params.id,req.body).then(patients=>{
        res.send(patients);
    });
});

module.exports = Router;