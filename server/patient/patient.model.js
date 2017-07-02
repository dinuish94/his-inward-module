const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

// create a schema
const patientSchema = new Schema({
    name: String,
    age: Number,
    gender:String,
    admitDate:Date,
    dischargeDate:Date,
    phoneNumber:Number,
    allergies: String,
    gName:String,
    gContactNumber:Number,
    gRelationship:String,
    gAddress:String,
    status:String,
    labTests : [{
        type : Schema.Types.ObjectId,
        ref : 'Lab'
    }],
    bed: {
        type: Schema.Types.ObjectId,
        ref: 'Bed'
    },
    operations : [{
        type: Schema.Types.ObjectId,
        ref: 'Theatre'
    }]
});

patientSchema.plugin(AutoIncrement, {inc_field: 'pid'});
patientSchema.plugin(AutoIncrement, {inc_field: 'bht'});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;