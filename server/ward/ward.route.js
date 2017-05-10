/**
 * Created by dinuksha on 5/2/17.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const WardModel = mongoose.model('Ward'),
    BedModel = mongoose.model('Bed'),
    DoctorModel = mongoose.model('Doctor');

const Router = express.Router();

/**
 * Retrieve all ward records
 */
Router.get('/', (req, res) => {
    WardModel.find().populate('beds').populate('head').exec().then(wards => {
        res.json(wards);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

/**
 * Add new ward and assign doctor to ward
 */
Router.post('/', (req, res) => {
    const newWard = new WardModel(req.body);
    newWard.created_at = new Date();
    newWard.save().then(ward => {
        DoctorModel.findOne({'docId':req.body.docId}).then(docDb=>{
            return WardModel.findByIdAndUpdate(ward._id, {$set: {'head': docDb._id}});
        }).then((addedWard) =>{
            res.json(addedWard);
        })
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

/**
 * Delete ward
 */
Router.delete('/:id', (req, res) => {
    WardModel.deleteOne({'id':req.params.id}).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

/**
 * Get ward by unique ID
 */
Router.get('/:id', (req, res) => {
    WardModel.findOne({'id':req.params.id}).populate('beds').exec().then(ward => {
        res.json(ward || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

/**
 * Add new bed to ward
 */
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

/**
 * Delete bed
 */
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