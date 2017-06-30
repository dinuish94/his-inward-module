/**
 * Created by dinuksha on 5/2/17.
 */

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

// create a schema
const transferSchema = new Schema({
    patientId: Number,
    to: String,
    from: String,
    reason: String,
    transferDate: Date,
    remarks: String
});

transferSchema.plugin(AutoIncrement, {inc_field: 'etId'});

// create a model to start using the schema
const Transfer = mongoose.model('ETransfer', transferSchema);

// make this available to the application
module.exports = Transfer;