const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Deve ter nome'],
        unique: true,
    },
    rating: {
        type: Number,
        required: [true, 'Deve ter nome'],
        default: 4.5,
    },
    price: {
        type: Number,
        required: [true, 'Deve ter preço  '],
    },
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
