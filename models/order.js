const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId, // ✅ Store product reference properly
                ref: 'Product',
                required: true
            },
            quantity: { type: Number, required: true }
        }
    ]
});

module.exports = mongoose.model('Order', orderSchema);
