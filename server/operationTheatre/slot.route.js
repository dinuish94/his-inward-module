/**
 * Created by Jonathan on 5/9/2017.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);


const SlotModel = mongoose.model('Slot');
const TheatreModel = mongoose.model('Theatre');

const Router = express.Router();

Router.post('/:id', (req, res) => {
    let theatreId = req.params.id;
    const slot = new SlotModel(req.body);
    slot.theatre = theatreId;
    slot.save().then(slot => {
        return TheatreModel.findByIdAndUpdate(theatreId,{$push :{"slots":slot._id}});
    }).then(()=>{
        return TheatreModel.findById(theatreId).populate('slots').exec();
    }).then(theatre=>{
        res.send(theatre);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});





module.exports = Router;