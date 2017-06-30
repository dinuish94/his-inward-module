/**
 * Created by Jonathan on 5/9/2017.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);


const TheatreModel = mongoose.model('Theatre');

const Router = express.Router();

Router.post('/', (req, res) => {
    const theatre = new TheatreModel(req.body);
    theatre.created_at = new Date();
    theatre.activeFlag=1;
    theatre.save().then(theatre => {
        res.json(theatre);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});





module.exports = Router;