/**
 * Created by Jonathan on 5/9/2017.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const LabModel = mongoose.model('Lab');
const LabTypeModel = mongoose.model('LabTypes');
const patientModel = mongoose.model('Patient');

const Router = express.Router();

Router.get('/', (req, res) => {
    LabModel.find().populate('patient').exec().then(labs => {
    res.json(labs);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:id',(req,res) =>  {
    LabModel.findById(req.params.id).then(lab=>{
    res.json(lab);
    }).catch( err =>{
        res.sendStatus(500);
    });
});

Router.put('/:id',(req,res)=>{
    let labId = req.params.id;
    let lab = req.body;
    LabModel.findByIdAndUpdate(labId,{$set : lab}).then(labDB =>{
        return patientModel.findById(labDB.patient).populate('labTests').exec();
    }).then(patient=>{
        res.json(patient);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/:id', (req, res) => {
    let patientId = req.params.id;
    const newLab = new LabModel(req.body);
    newLab.patient = patientId;
    newLab.created_at = new Date();
    newLab.save().then(labDB => {
        return patientModel.findByIdAndUpdate(patientId,{$push :{'labTests':labDB._id}});
    }).then(()=>{
        return patientModel.findById(patientId).populate('labTests').exec();
    }).then(patient =>{
        res.json(patient);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});



Router.delete('/:id',(req,res) => {
    let labId = req.params.id;
    LabModel.findByIdAndRemove(labId).then(labDb=>{
        return patientModel.findById(labDb.patient).populate('labTests').exec();
    }).then(patient =>{
        res.json(patient);
    }).catch(err => {
        console.error(err);
    res.sendStatus(500);
    });
});

// Router.post('/labRequests/:id', (req, res) => {
//     let labId = req.params.id;
//     const lab = req.body;
//     lab.status = "Completed";
//     console.log(lab);
//     LabModel.findByIdAndUpdate(labId,{$set : lab }).then(labDB =>{
//         res.json(labDB);
//     }).catch(err => {
//         console.error(err);
//         res.sendStatus(500);
//     });
// });




module.exports = Router;