/**
 * Created by Jonathan on 5/9/2017.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);


const TheatreModel = mongoose.model('Theatre');
const patientModel = mongoose.model('Patient');

const Router = express.Router();

Router.post('/:id', (req, res) => {
    const theatre = new TheatreModel(req.body);
    const patientId = req.params.id; 
    theatre.patient = patientId;
    theatre.status="Pending";
    theatre.activeFlag=1;
    theatre.save().then(theatre => {
        return patientModel.findByIdAndUpdate(patientId,{$push:{'operations':theatre._id}});
    }).then(()=>{
        return patientModel.findById(patientId).populate('operations').populate({ 
        path: 'operations',
        populate: {
        path: 'doctor',
        model: 'Doctor'
        } 
    }).exec();
    }).then(patient=>{
        res.json(patient);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:id', (req, res) => {
    TheatreModel.findById(req.params.id).populate('doctor').exec().then(theatre => {
        res.json(theatre || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.delete('/:id', (req, res) => {
    TheatreModel.findByIdAndRemove(req.params.id).then(theatre => {
        res.json(theatre || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});





module.exports = Router;