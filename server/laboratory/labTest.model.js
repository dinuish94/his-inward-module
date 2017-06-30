/**
 * Created by Jonathan on 5/9/2017.
 */
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

// create a schema
const labSchema = new Schema({
    testName: String,
    patientId : String,
    priority : String,
    dueDate : Date,
    status : String,
    comment: String,
    remarks:String,
    activeFlag:Number,
    patient : {
        type : Schema.Types.ObjectId,
        ref : 'Patient'
    }
});

labSchema.plugin(AutoIncrement, {inc_field: 'testId'});

// create a model to start using the schema
const Lab = mongoose.model('Lab', labSchema);

// make this available to the application
module.exports = Lab;