
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

Router.get('/:id', (req, res) => {
    patientModel.findOne({'id':req.params.id}).then(patient => {
        res.json(patient || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

// Router.post('/:id/beds', (req, res) => {
//     let bed = new BedModel(req.body);
//     const wardId = req.params.id;
//     bed.id = wardId;
//     bed.save().then(bedDb => {
//         return patientModel.findOneAndUpdate({'id':req.params.id}, {$push: {"beds": bedDb._id}})
//     }).then(() => {
//         return patientModel.findOne({'id':req.params.id}).populate('beds').exec();
//     }).then(wardDb => {
//         res.json(wardDb);
//     }).catch(err => {
//         console.error(err);
//     res.sendStatus(500);
//     });
// });

module.exports = Router;