var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Schema = mongoose.Schema;
var Currency = mongoose.Types.Currency;

var promotionSchema =  new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true,
        default: ''
    },
    price: {
        type: Currency,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;