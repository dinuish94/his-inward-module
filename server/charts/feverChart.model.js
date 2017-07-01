const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

const chartSchema = new Schema ({
    patient: [{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }],
    day: String,
    temperature: Number

});

chartSchema.plugin(autoIncrement, {inc_field: 'fcId'});

var chart = mongoose.model('feverChart',chartSchema);

module.exports = chart; 