/**
 * Created by kashif on 5/2/17.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const prescriptionModel = mongoose.model('Prescription');
const patientModel = mongoose.model('Patient');

const drugModel = mongoose.model('Drug');

const Router = express.Router();

Router.get('/', (req, res) => {
    prescriptionModel.find().populate('drug').exec().then(prescription => {
        res.json(prescription);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:id', (req, res) => {
    patientModel.findById(req.params.id).then(patient => {
        prescriptionModel.find({ 'patient': patient._id }).populate('patient').populate('drug').exec().then(prescription => {
            res.json(prescription);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    });
});

Router.post('/', (req, res) => {
    const newPresc = new prescriptionModel(req.body);
    newPresc.save().then(prescription => {
        res.json(prescription);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/:id', (req, res) => {

    const newPres = new prescriptionModel(req.body);

    newPres.save().then(pres => {
        res.json(pres);

    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});


Router.put('/:id', (req, res) => {
    console.log("the id is " + req.params.id);
    console.log('data are');
    console.log(req.body);
    prescriptionModel.update(req.params.id, req.body).then(prescription => {
        res.send(prescription);
    });
});

Router.delete('/:id', (req, res) => {
    console.log(req.params);
    prescriptionModel.deleteOne({ 'presId': req.params.id }).then(() => {
        console.log("the record is deleted");
        res.sendStatus(200);
    });
});

module.exports = Router;