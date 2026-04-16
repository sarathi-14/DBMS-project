const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    booking: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Booking', 
        required: true,
        unique: true
    },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    method: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
