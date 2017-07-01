/**
 * Created by kashif on 5/2/17.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const prescriptionModel = mongoose.model('Prescription');

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
    patientModel.findOne({ pid: req.params.id }).then(patient => {
        prescriptionModel.find({ 'patient': patient._id }).populate('patient').exec().then(prescription => {
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
    patientModel.findOne({ 'pid': req.params.id }).then(patient => {
        var dietParams = {
            patient: patient._id,
            meal: req.body.meal,
            quantity: req.body.quantity
        }

        const newDiet = new dietModel(dietParams);

        newDiet.save().then(diet => {
            res.json(diet);

        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    });
});


Router.put('/:id',(req,res)=>{
    console.log("the id is "+req.params.id);
    console.log('data are');
    console.log(req.body);
    prescriptionModel.update(req.params.id,req.body).then(prescription=>{
        res.send(prescription);
    });
});

Router.delete('/:id',(req,res)=>{
    console.log(req.params);
    prescriptionModel.deleteOne({'presId':req.params.id}).then(()=>{
        console.log("the record is deleted");
        res.sendStatus(200);
    });
});

module.exports = Router;