const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    imageUrl: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Product', productSchema);

