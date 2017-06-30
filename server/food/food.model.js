const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');
const Schema = mongoose.Schema;

const foodSchema = new Schema ({
    name: String,
    availableQuantity: String,
    calories_100g:Number 
});

foodSchema.plugin(autoIncrement, {inc_field: 'foodId'});

var food = mongoose.model('Food',foodSchema);

module.exports = food; 