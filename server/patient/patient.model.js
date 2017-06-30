const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

// create a schema
const patientSchema = new Schema({
    name: String,
    age: Number,
    gender:String,
    phoneNumber:String,
    allergies: String,
    gName:String,
    gContactNumber:Number,
    gRelationship:String,
    gAddress:String,
    status:String
});

patientSchema.plugin(AutoIncrement, {inc_field: 'pid'});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;