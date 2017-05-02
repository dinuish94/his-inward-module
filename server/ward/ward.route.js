/**
 * Created by dinuksha on 5/2/17.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const WardModel = mongoose.model('Ward');

const Router = express.Router();

Router.get('/', (req, res) => {
    WardModel.find().then(wards => {
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
    WardModel.findByIdAndRemove(req.params.id).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

module.exports = Router;