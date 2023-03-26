const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    billing_first_name: {
        type: String,
    },
    billing_last_name: {
        type: String,
    },
    billing_addr1: {
        type: String,
    },
    billing_addr2: {
        type: String,
    },
    billing_country: {
        type: String,
    },
    billing_state: {
        type: String,
    },
    billing_zip: {
        type: String,
    },
    shipping_first_name: {
        type: String,
    },
    shipping_last_name: {
        type: String,
    },
    shipping_addr1: {
        type: String,
    },
    shipping_addr2: {
        type: String,
    },
    shipping_country: {
        type: String,
    },
    shipping_state: {
        type: String,
    },
    shipping_zip: {
        type: String,
    },
    password: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        default: 'active'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = Customer = mongoose.model('customer',CustomerSchema);