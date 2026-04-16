const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// @route   POST /api/rooms
// @desc    Add a new room (utility)
router.post('/', async (req, res) => {
    try {
        const { roomNumber, roomType, price } = req.body;
        const newRoom = new Room({ roomNumber, roomType, price });
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/rooms/available
// @desc    Get all available rooms
router.get('/available', async (req, res) => {
    try {
        const rooms = await Room.find({ status: 'Available' });
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/rooms
// @desc    Get all rooms
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
