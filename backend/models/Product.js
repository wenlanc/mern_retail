const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    items:{
        type: String,
        required: true
    },
    sdsFile: {
        type: String,
    },
    labelFile: {
        type: String,
    },
    imageFile: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = Product = mongoose.model('product',ProductSchema);