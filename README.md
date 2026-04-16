# Hotel Management System (MERN Stack)

A complete, production-ready Hotel Management System built with MongoDB, Express, React, and Node.js.

## Features
- **Dashboard**: Professional UI with branded logo and quick access buttons.
- **Customer Management**: Register new guests.
- **Room Management**: View real-time availability.
- **Booking System**: Book rooms for registered customers with date validation.
- **Payment Processing**: Handle billing and prevent duplicate payments.
- **Checkout**: Mark rooms as available once guests leave.
- **Transaction History**: View all past payments with populated guest and room details.

## Tech Stack
- **Frontend**: React, Axios, React Router, Inline CSS (Premium Design).
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB.

## Installation & Setup

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the `.env` file with your MongoDB URI (if different from default):
   ```env
   MONGO_URI=mongodb://localhost:27017/hotel_management
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Usage
1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Start by **Adding a Customer**.
3. (Optional) Create rooms directly in the MongoDB `rooms` collection or use a tool like Postman to POST to `/api/rooms`.
4. **Book a Room** for your customer.
5. **Process Payment** for the booking.
6. **Checkout** the guest when they are done.
