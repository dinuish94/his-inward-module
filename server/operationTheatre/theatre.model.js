/**
 * Created by Jonathan on 5/9/2017.
 */
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

// create a schema
const theatreSchema = new Schema({
    dueDate : Date,
    time : String,
    activeFlag : Number,
    doctor : {
        type : Schema.Types.ObjectId,
        ref : 'Doctor'
    },
    patient: {
        type : Schema.Types.ObjectId,
        ref : 'Patient'
    },
    status : String,
    priority : String
});

theatreSchema.plugin(AutoIncrement, {inc_field: 'theatreId'});

// create a model to start using the schema
const Theatre = mongoose.model('Theatre', theatreSchema);

// make this available to the application
module.exports = Theatre;