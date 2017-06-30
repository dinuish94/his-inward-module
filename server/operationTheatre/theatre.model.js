/**
 * Created by Jonathan on 5/9/2017.
 */
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

// create a schema
const theatreSchema = new Schema({
    theatreName: String,
    slots : [{
        type : Schema.Types.ObjectId,
        ref : 'Slot'
    }],
    activeFlag:Number
});

theatreSchema.plugin(AutoIncrement, {inc_field: 'theatreId'});

// create a model to start using the schema
const Theatre = mongoose.model('Theatre', theatreSchema);

// make this available to the application
module.exports = Theatre;