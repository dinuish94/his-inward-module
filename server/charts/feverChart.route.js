/**
 * Created by kashif on 5/2/17.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const feverModel = mongoose.model('feverChart');

const patientModel = mongoose.model('Patient');

const Router = express.Router();

Router.get('/:id', (req, res) => {

    let chartVariables = {
        'x' : ['Monday','Tuesday','Wednesday','Thurseday','Friday','Saturday','Sunday'],
        'y' : [96,92,94,97,105,96,107]
    }

    res.json(chartVariables);



    // patientModel.findOne({ pid: req.params.id }).then(patient => {
    //     feverModel.find({ 'patient': patient._id }).populate('patient').exec().then(chart => {
    //         res.json(chart);
    //     }).catch(err => {
    //         console.error(err);
    //         res.sendStatus(500);
    //     });
    // });
});

Router.post('/', (req, res) => {
    const newDiet = new dietModel(req.body);
    newDiet.save().then(diet => {
        res.json(diet);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/:id', (req, res) => {
    patientModel.findOne({ 'pid': req.params.id }).then(patient => {
        var chartEntry = {
            patient: patient._id,
            day: req.body.day,
            temperature: req.body.temperature
        }

        const newEntry = new feverModel(chartEntry);

        newEntry.save().then(chart => {
            res.json(chart);

        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    });
});

Router.delete('/:id', (req, res) => {
    dietModel.deleteOne({ 'dietId': req.params.id }).then(() => {
        res.json(true);
    });
});

Router.put('/:id', (req, res) => {
    console.log("the id is " + req.params.id);
    console.log('data are');
    console.log(req.body);
    dietModel.update(req.params.id, req.body).then(diet => {
        res.send(diet);
    });
});

module.exports = Router;