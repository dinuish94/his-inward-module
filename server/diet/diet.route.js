/**
 * Created by kashif on 5/2/17.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const dietModel = mongoose.model('Diet');

const foodModel = mongoose.model('Food');

const patientModel = mongoose.model('Patient');

const Router = express.Router();

Router.get('/', (req, res) => {
    dietModel.find().populate('patient').populate('food').exec().then(diet => {
        res.json(diet);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:id', (req, res) => {

    patientModel.findById(req.params.id).then(patient => {
        dietModel.find({ 'patient': patient._id }).populate('patient').populate('food').exec().then(diet => {
            res.json(diet);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    });
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
    patientModel.findById(req.params.id).then(patient => {
        var dietParams = {
            patient: patient._id,
            food: req.body.foodId,
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