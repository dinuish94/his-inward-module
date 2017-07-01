/**
 * Created by dinukshakandasamanage on 5/2/17.
 */

'use strict';

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');

const Schema = mongoose.Schema;

const BedSchema = new Schema({
    type: String,
    added_at: Date,
    available: {
        type: Boolean,
        default: true
    },
    ward: {
        type: Schema.Types.ObjectId,
        ref: 'Ward'
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }
});

BedSchema.plugin(AutoIncrement, {inc_field: 'bId'});

const Bed = mongoose.model('Bed', BedSchema);

module.exports = Bed;