/**
 * Created by dinuksha on 5/2/17.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const WardModel = mongoose.model('Ward'),
    BedModel = mongoose.model('Bed');

const Router = express.Router();

Router.get('/', (req, res) => {
    WardModel.find().populate('beds').exec().then(wards => {
        res.json(wards);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    const newWard = new WardModel(req.body);
    newWard.created_at = new Date();
    newWard.save().then(wards => {
        res.json(wards);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.delete('/:id', (req, res) => {
    WardModel.deleteOne({'id':req.params.id}).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:id', (req, res) => {
    WardModel.findOne({'id':req.params.id}).populate('beds').exec().then(ward => {
        res.json(ward || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/:id/beds', (req, res) => {
    let bed = new BedModel(req.body);
    bed.save().then(bedDb => {
        return WardModel.findOneAndUpdate({'id':req.params.id}, {$push: {"beds": bedDb._id}})
    }).then(() => {
        return WardModel.findOne({'id':req.params.id}).populate('beds').exec();
    }).then(wardDb => {
        res.json(wardDb);
    }).catch(err => {
        console.error(err);
    res.sendStatus(500);
    });
});

Router.delete('/:id/beds/:bedId', (req, res) => {
    const wardId = req.params.id;
    const bedId = req.params.bedId;
    
    BedModel.findOneAndRemove({'bId':bedId}).then(bed =>{
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

module.exports = Router;