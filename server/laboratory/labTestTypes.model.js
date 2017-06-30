/**
 * Created by Jonathan on 5/9/2017.
 */
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

const labTestTypeSchema = new Schema({
    testType: String,
    activeFlag : Number
});

labTestTypeSchema.plugin(AutoIncrement, {inc_field: 'testTypeId'});
// create a model to start using the schema
const LabTypes = mongoose.model('LabTypes', labTestTypeSchema);
module.exports = LabTypes;