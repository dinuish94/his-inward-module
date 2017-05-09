const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

// create a schema
const doctorSchema = new Schema({
    name: String,
    speciality: String,
    ward: {
        type: Schema.Types.ObjectId,
        ref: 'Ward'
    }
});

doctorSchema.plugin(AutoIncrement, {inc_field: 'docId'});

// create a model to start using the schema
const Doctor = mongoose.model('Doctor', doctorSchema);

// make this available to the application
module.exports = Doctor;