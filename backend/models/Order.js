const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customerId: { type: Schema.Types.ObjectId, ref: 'customer' },
    items: [{
        _id: {
            type: String,
        },
        name: String,
        count: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.']
        },
        price: Number
    }],
    paymentMethod: {
        type: String
    },
    payAmount: {
        type: Number,
    },
    status: {
        type: String,
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = Order = mongoose.model('order',OrderSchema);