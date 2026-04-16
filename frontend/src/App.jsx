import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddCustomer from './components/AddCustomer';
import BookRoom from './components/BookRoom';
import AvailableRooms from './components/AvailableRooms';
import Payment from './components/Payment';
import Checkout from './components/Checkout';
import PaymentDetails from './components/PaymentDetails';

const App = () => {
    return (
        <Router>
            <div style={{ minHeight: '100vh', backgroundColor: '#FBF9F0' }}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/add-customer" element={<AddCustomer />} />
                    <Route path="/book-room" element={<BookRoom />} />
                    <Route path="/available-rooms" element={<AvailableRooms />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/payment-details" element={<PaymentDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
