/**
 * Created by kashif on 5/2/17.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const foodModel = mongoose.model('Food');

const Router = express.Router();

Router.get('/', (req, res) => {
    foodModel.find().then(food => {
        res.json(food);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    console.log(req.body);
    const newFood = new foodModel(req.body);
    newFood.save().then(food => {
        res.json(food);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

// Router.put('/:id',(req,res)=>{
//     console.log("the id is "+req.params.id);
//     console.log('data are');
//     console.log(req.body);
//     prescriptionModel.update(req.params.id,req.body).then(prescription=>{
//         res.send(prescription);
//     });
// });

// Router.delete('/:id',(req,res)=>{
//     console.log(req.params);
//     prescriptionModel.deleteOne({'presId':req.params.id}).then(()=>{
//         console.log("the record is deleted");
//         res.sendStatus(200);
//     });
// });

module.exports = Router;