/**
 * Created by kashif on 5/2/17.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const prescriptionModel = mongoose.model('Prescription');

const Router = express.Router();

Router.get('/', (req, res) => {
    prescriptionModel.find().then(prescription => {
        res.json(prescription);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    const newPresc = new prescriptionModel(req.body);
    newPresc.created_at = new Date();
    newPresc.save().then(prescription => {
        res.json(prescription);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

// Router.delete('/:id', (req, res) => {
//     WardModel.deleteOne({'id':req.params.id}).then(() => {
//         res.sendStatus(200);
//     }).catch(err => {
//         console.error(err);
//         res.sendStatus(500);
//     });
// });

// Router.get('/:id', (req, res) => {
//     WardModel.findOne({'id':req.params.id}).populate('beds').exec().then(ward => {
//         res.json(ward || {});
//     }).catch(err => {
//         console.error(err);
//         res.sendStatus(500);
//     });
// });

// Router.post('/:id/beds', (req, res) => {
//     let bed = new BedModel(req.body);
//     const wardId = req.params.id;
//     bed.id = wardId;
//     bed.save().then(bedDb => {
//         return WardModel.findOneAndUpdate({'id':req.params.id}, {$push: {"beds": bedDb._id}})
//     }).then(() => {
//         return WardModel.findOne({'id':req.params.id}).populate('beds').exec();
//     }).then(wardDb => {
//         res.json(wardDb);
//     }).catch(err => {
//         console.error(err);
//     res.sendStatus(500);
//     });
// });

module.exports = Router;