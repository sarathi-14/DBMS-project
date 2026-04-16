const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// @route   POST /api/payments
// @desc    Make a payment
router.post('/', async (req, res) => {
    try {
        const { bookingId, amount, method } = req.body;

        // 1. Validate Booking
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        // 2. Prevent Duplicate Payments
        const existingPayment = await Payment.findOne({ booking: bookingId });
        if (existingPayment) {
            return res.status(400).json({ message: 'Payment already made for this booking' });
        }

        // 3. Create Payment
        const newPayment = new Payment({
            booking: bookingId,
            amount,
            method
        });
        const savedPayment = await newPayment.save();

        // 4. Update Booking paymentStatus
        booking.paymentStatus = 'Paid';
        await booking.save();

        res.status(201).json(savedPayment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/payments
// @desc    Get all payments
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find().populate({
            path: 'booking',
            populate: [
                { path: 'customer' },
                { path: 'room' }
            ]
        });
        res.json(payments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
