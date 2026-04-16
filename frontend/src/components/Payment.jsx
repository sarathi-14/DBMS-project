import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('Credit Card');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/bookings');
                // Filter only pending payments
                setBookings(res.data.filter(b => b.paymentStatus === 'Pending'));
            } catch (err) {
                console.error(err);
            }
        };
        fetchBookings();
    }, []);

    const handleSelectBooking = (id) => {
        const booking = bookings.find(b => b._id === id);
        setSelectedBooking(booking);
        // Default amount could be room price * stays, but let's keep it simple
        if (booking) setAmount(booking.room.price);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/payments', {
                bookingId: selectedBooking._id,
                amount,
                method
            });
            setMessage('Payment successful!');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setMessage('Error: ' + (err.response?.data?.message || err.message));
        }
    };

    const containerStyle = {
        maxWidth: '600px',
        margin: '50px auto',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        boxSizing: 'border-box'
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ color: '#4F6F84', marginBottom: '20px' }}>Process Payment</h2>
            {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green', marginBottom: '15px' }}>{message}</p>}
            
            <form onSubmit={handleSubmit}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Select Pending Booking</label>
                <select style={inputStyle} onChange={e => handleSelectBooking(e.target.value)} required>
                    <option value="">-- Choose Booking --</option>
                    {bookings.map(b => (
                        <option key={b._id} value={b._id}>
                            {b.customer.name} - Room {b.room.roomNumber} (${b.room.price})
                        </option>
                    ))}
                </select>

                {selectedBooking && (
                    <>
                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Amount to Pay</label>
                        <input style={inputStyle} type="number" value={amount} onChange={e => setAmount(e.target.value)} required />

                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Payment Method</label>
                        <select style={inputStyle} value={method} onChange={e => setMethod(e.target.value)} required>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI</option>
                            <option value="Debit Card">Debit Card</option>
                        </select>

                        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}>
                            Complete Payment
                        </button>
                    </>
                )}
            </form>
            <button onClick={() => navigate('/')} style={{ width: '100%', padding: '12px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>
                Back
            </button>
        </div>
    );
};

export default Payment;
