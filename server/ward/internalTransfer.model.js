/**
 * Created by dinuksha on 5/2/17.
 */

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

// create a schema
const transferSchema = new Schema({
    patientId: Number,
    to: Number,
    toBed: Number,
    reason: String,
    transferDate: Date,
    remarks: String
});

transferSchema.plugin(AutoIncrement, {inc_field: 'itId'});

// create a model to start using the schema
const Transfer = mongoose.model('ITransfer', transferSchema);

// make this available to the application
module.exports = Transfer;