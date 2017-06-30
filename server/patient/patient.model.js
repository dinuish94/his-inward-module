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
    bed: {
        type: Schema.Types.ObjectId,
        ref: 'Bed'
    }
});

patientSchema.plugin(AutoIncrement, {inc_field: 'pid'});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;