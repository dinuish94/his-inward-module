const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

const dietSchema = new Schema ({
    patient: [{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }],
    food: [{
        type:Schema.Types.ObjectId,
        ref:'Food'
    }],
    meal: String,
    quantity: Number

});

dietSchema.plugin(autoIncrement, {inc_field: 'dietId'});

var diet = mongoose.model('Diet',dietSchema);

module.exports = diet; 