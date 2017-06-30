const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

// create a schema
const patientSchema = new Schema({
    name: String,
    age: Number,
    gender:String,
    phoneNumber:String,
    altrPhoneNumber:String,
    allergies: String,
    labTests : [{
        type : Schema.Types.ObjectId,
        ref : 'Lab'
    }]
});

patientSchema.plugin(AutoIncrement, {inc_field: 'pid'});
patientSchema.plugin(AutoIncrement, {inc_field: 'bht'});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;