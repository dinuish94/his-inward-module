/**
 * Created by Jonathan on 5/9/2017.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);
const LabTypeModel = mongoose.model('LabTypes');
const Router = express.Router();

Router.get('/', (req, res) => {
    LabTypeModel.find({'activeFlag':1}).then(labTypes => {
    res.json(labTypes);
    }).catch(err => {
        console.error(err);
    res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    const newLabType = new LabTypeModel(req.body);
    newLabType.created_at = new Date();
    newLabType.activeFlag=1;
    newLabType.save().then(labTypes => {
        res.json(labTypes);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.delete('/:id',(req,res) => {
    LabTypeModel.findByIdAndUpdate(req.params.id,{$set:{'activeFlag':0}}).then(()=>{
    res.sendStatus(200);
    }).catch(err => {
        console.error(err);
    res.sendStatus(500);
    });

});


module.exports = Router;