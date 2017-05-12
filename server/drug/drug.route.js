'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const drugModel = mongoose.model('Drug');

const Router = express.Router();

Router.get('/', (req, res) => {
    drugModel.find().then(drug => {
        res.json(drug);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    const newDrug = new drugModel(req.body);
    newDrug.created_at = new Date();
    newDrug.save().then(drug => {
        res.json(drug);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

module.exports = Router;