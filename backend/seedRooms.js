const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Room = require('./models/Room');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const seedRooms = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB for seeding...');

        // Clear existing rooms
        await Room.deleteMany({});
        console.log('Existing rooms cleared.');

        let rooms = [];

        // Single (1–100)
        for (let i = 1; i <= 100; i++) {
            rooms.push({
                roomNumber: i.toString(),
                roomType: "Single",
                price: 1000,
                status: "Available"
            });
        }

        // Double (101–200)
        for (let i = 101; i <= 200; i++) {
            rooms.push({
                roomNumber: i.toString(),
                roomType: "Double",
                price: 2000,
                status: "Available"
            });
        }

        // Deluxe (201–300)
        for (let i = 201; i <= 300; i++) {
            rooms.push({
                roomNumber: i.toString(),
                roomType: "Deluxe",
                price: 3000,
                status: "Available"
            });
        }

        // Super Deluxe (301–350)
        for (let i = 301; i <= 350; i++) {
            rooms.push({
                roomNumber: i.toString(),
                roomType: "Super Deluxe",
                price: 4000,
                status: "Available"
            });
        }

        // Suite (351–360)
        for (let i = 351; i <= 360; i++) {
            rooms.push({
                roomNumber: i.toString(),
                roomType: "Suite",
                price: 5000,
                status: "Available"
            });
        }

        // Insert all rooms
        await Room.insertMany(rooms);
        console.log('✅ 360 Rooms Inserted Successfully!');

        // Close connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');

    } catch (error) {
        console.error('Error seeding rooms:', error);
        process.exit(1);
    }
};

seedRooms();
