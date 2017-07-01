/**
 * Created by dinuksha on 5/2/17.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const WardModel = mongoose.model('Ward'),
    BedModel = mongoose.model('Bed'),
    PatientModel = mongoose.model('Patient'),
    DoctorModel = mongoose.model('Doctor'),
    ITransferModel = mongoose.model('ITransfer'),
    ETransferModel = mongoose.model('ETransfer');

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
 * Update ward
 */
Router.put('/:id',(req,res)=>{
    let wardId = req.params.id;
    let ward = req.body;
    WardModel.findOneAndUpdate({'id':wardId},{$set : ward}).then(ward =>{
        return WardModel.findOne({'id':wardId}).populate('beds').exec();
    }).then(ward=>{
        res.json(ward);
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

/**
 * Get beds for a given ward
 */
Router.get('/:id/beds', (req, res) => {
    WardModel.findOne({'id':req.params.id}).populate('beds').exec().then(ward => {
        let beds = ward.beds;
        let patients = [];

        const bedIds = ward.beds.map((bedId => bedId));
        return BedModel.find({'_id': {$in: bedIds}}).populate('patient').exec();
    }).then(beds => {
        res.json(beds || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

/**
 * Add an Internal Transfer
 * Allocate new bed and make the current bed available
 */
Router.post('/itransfers', (req,res) => {
    let transfer = new ITransferModel(req.body);
    transfer.save().then(transfer => {
        PatientModel.findOne({'pid':req.body.patientId}).then(patient => {
            return BedModel.findOneAndUpdate({'_id':patient.bed},{$set: {"available": true, "patient":null}});
        }).then(() => {
            PatientModel.findOne({'pid':req.body.patientId}).then(patient => {
                return BedModel.findOneAndUpdate({'bId':req.body.toBed},{$set: {"patient": patient._id, "available":false }});
            }).then( bed => {
                return PatientModel.findOneAndUpdate({'pid':req.body.patientId},{$set: {"bed": bed._id }})
            }).then( patient => {
                return PatientModel.findById(patient._id).populate('bed');
            }).then( patient => {
                res.json(patient);
            })
        })
    }) 
})

/**
 * Add an External Transfer
 */
Router.post('/etransfers', (req,res) => {
    let transfer = new ETransferModel(req.body);
    transfer.save().then(transfer => {
        res.json(transfer);
    }) 
})

module.exports = Router;