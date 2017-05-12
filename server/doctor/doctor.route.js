/**
 * Created by dinuksha on 5/2/17.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const DoctorModel = mongoose.model('Doctor');

const Router = express.Router();

Router.get('/', (req, res) => {
    DoctorModel.find().then(doctors => {
        res.json(doctors);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    const newDoctor = new DoctorModel(req.body);
    newDoctor.save().then(doctor => {
        res.json(doctor);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

module.exports = Router;