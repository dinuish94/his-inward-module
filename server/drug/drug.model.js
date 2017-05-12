const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

const drugSchema = new Schema({
    drugName: String,
    form: String,
    strength:String,
    activeIngredient:String   
});

drugSchema.plugin(autoIncrement,{inc_field: 'drugId'});

const drug = mongoose.model('Drug',drugSchema);

module.exports = drug;

