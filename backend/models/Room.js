const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    roomType: { 
        type: String, 
        required: true, 
        enum: ['Single', 'Double', 'Deluxe', 'Super Deluxe', 'Suite'] 
    },
    price: { type: Number, required: true },
    status: { 
        type: String, 
        default: 'Available', 
        enum: ['Available', 'Booked'] 
    }
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);
