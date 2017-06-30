/**
 * Created by dinuksha on 5/2/17.
 */

'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const PatientModel = mongoose.model('Patient'),
    BedModel = mongoose.model('Bed');

const Router = express.Router();

/**
 * Retrieves bed by ID
 */
Router.get('/:bId', (req, res) => {
    BedModel.findOne({'bId':req.params.bId}).then(bed => {
        res.json(bed);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

/**
 * Assigns a patient to a bed
 */
Router.post('/patients', (req, res) => {
    let bedId = req.body.bedId;
    let patientId = req.body.patientId;

    BedModel.findOne({'bId':bedId}).then(bed => {
        bed.available=false;
        bed.save().then(bed => {
            return PatientModel.findOneAndUpdate({'pid':patientId}, {$set: {'bed': bed._id}})
        })
    }).then(() => {
        return PatientModel.findOne({'pid':patientId}).populate('bed').exec();
    }).then(patient => {
        return BedModel.findOneAndUpdate({'bId':bedId}, {$set: {'patient': patient._id}})
    }).then(bed => {
        res.json(bed);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

module.exports = Router;