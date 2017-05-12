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

Router.post('/', (req, res) => {
    var pres = req.body;
    console.log(pres);
    const newPresc = new prescriptionModel(pres);
    newPresc.created_at = new Date();
    newPresc.save().then(prescription => {
        res.json(prescription);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
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

module.exports = Router;