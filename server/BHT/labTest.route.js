/**
 * Created by Jonathan on 5/9/2017.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const LabModel = mongoose.model('Lab');
const LabTypeModel = mongoose.model('LabTypes');


const Router = express.Router();

Router.get('/', (req, res) => {
    LabModel.find().then(labs => {
    res.json(labs);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/labTypes', (req, res) => {
    LabTypeModel.find().then(labTypes => {
    res.json(labTypes);
}).catch(err => {
    console.error(err);
res.sendStatus(500);
});
});

Router.get('/:testId',(req,res) =>  {
    LabModel.findOne({'testId':req.params.testId}).then(lab=>{
    res.json(lab);
}).catch( err =>{
    res.sendStatus(500);
});

});

Router.post('/', (req, res) => {
    const newLab = new LabModel(req.body);
    newLab.created_at = new Date();
    newLab.save().then(labs => {
        res.json(labs);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.delete('/:testId',(req,res) => {
    LabModel.deleteOne({'testId':req.params.testId}).then(()=>{
    res.sendStatus(200);
}).catch(err => {
    console.error(err);
res.sendStatus(500);
});

});


module.exports = Router;