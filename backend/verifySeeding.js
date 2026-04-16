const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Room = require('./models/Room');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const verify = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const count = await Room.countDocuments();
        console.log(`Total rooms in database: ${count}`);
        
        const types = await Room.aggregate([
            { $group: { _id: "$roomType", count: { $sum: 1 } } }
        ]);
        console.log('Room types breakdown:');
        types.forEach(t => console.log(`- ${t._id}: ${t.count}`));

        await mongoose.connection.close();
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
};

verify();
