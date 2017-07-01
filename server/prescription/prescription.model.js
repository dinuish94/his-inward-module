const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema ({
    patient: [{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }],
    drug: [{
        type: Schema.Types.ObjectId,
        ref: 'Drug'
    }],
    dosage: Number,
    frequency: String

});

prescriptionSchema.plugin(autoIncrement, {inc_field: 'presId'});

var prescription = mongoose.model('Prescription',prescriptionSchema);

module.exports = prescription; 