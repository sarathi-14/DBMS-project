const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Customer = require('../models/Customer');

// @route   POST /api/bookings
// @desc    Create a new booking
router.post('/', async (req, res) => {
    try {
        const { customerId, roomId, checkIn, checkOut } = req.body;

        // 1. Validate Customer
        const customer = await Customer.findById(customerId);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });

        // 2. Validate Room
        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: 'Room not found' });

        // 3. Check Room Availability
        if (room.status === 'Booked') {
            return res.status(400).json({ message: 'Room is already booked' });
        }

        // 4. Create Booking
        const newBooking = new Booking({
            customer: customerId,
            room: roomId,
            checkIn,
            checkOut,
            status: 'Booked',
            paymentStatus: 'Pending'
        });

        const savedBooking = await newBooking.save();

        // 5. Update Room Status
        room.status = 'Booked';
        await room.save();

        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   PUT /api/bookings/checkout/:id
// @desc    Checkout a booking
router.put('/checkout/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        if (booking.status === 'Checked-Out') {
            return res.status(400).json({ message: 'Already checked out' });
        }

        // 1. Update Booking Status
        booking.status = 'Checked-Out';
        await booking.save();

        // 2. Update Room Status back to Available
        await Room.findByIdAndUpdate(booking.room, { status: 'Available' });

        res.json({ message: 'Checked out successfully', booking });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/bookings
// @desc    Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('customer').populate('room');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
