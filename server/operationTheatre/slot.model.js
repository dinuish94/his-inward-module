/**
 * Created by Jonathan on 5/9/2017.
 */
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

// create a schema
const slotSchema = new Schema({
    time: Date,
    booked : Number,
    theatre : {
        type : Schema.Types.ObjectId,
        ref : 'Theatre'
    }
});

slotSchema.plugin(AutoIncrement, {inc_field: 'slotId'});

// create a model to start using the schema
const Slot = mongoose.model('Slot', slotSchema);

// make this available to the application
module.exports = Slot;