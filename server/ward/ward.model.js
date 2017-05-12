/**
 * Created by dinuksha on 5/2/17.
 */

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

// create a schema
const wardSchema = new Schema({
    name: String,
    bedCount: Number,
    description: String,
    created_at: Date,
    updated_at: Date,
    beds: [{
        type: Schema.Types.ObjectId,
        ref: 'Bed'
    }],
    head: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    }
});

wardSchema.plugin(AutoIncrement, {inc_field: 'id'});

// create a model to start using the schema
const Ward = mongoose.model('Ward', wardSchema);

// make this available to the application
module.exports = Ward;