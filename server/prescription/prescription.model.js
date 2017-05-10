const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema ({
    drug: String,
    dosage: Number,
    frequency: String

});

prescriptionSchema.plugin(autoIncrement, {inc_field: 'id'});

var prescription = mongoose.model('Prescription',prescriptionSchema);

module.exports = prescription; 