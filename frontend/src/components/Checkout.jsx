import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/bookings`);
                // Only active bookings
                setBookings(res.data.filter(b => b.status === 'Booked'));
            } catch (err) {
                console.error(err);
            }
        };
        fetchBookings();
    }, []);

    const handleCheckout = async (id) => {
        try {
            await axios.put(`${API_URL}/api/bookings/checkout/${id}`);
            setMessage('Checkout successful! Room is now available.');
            setBookings(bookings.filter(b => b._id !== id));
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Error: ' + (err.response?.data?.message || err.message));
        }
    };

    const containerStyle = {
        padding: '40px',
        maxWidth: '1000px',
        margin: '0 auto'
    };

    const cardStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    return (
        <div style={containerStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ color: '#4F6F84' }}>Guest Checkout</h2>
                <button onClick={() => navigate('/')} style={{ padding: '10px 20px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Back to Dashboard</button>
            </div>

            {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green', padding: '10px', backgroundColor: 'white', borderRadius: '8px', textAlign: 'center' }}>{message}</p>}

            {bookings.length === 0 ? <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#7f8c8d' }}>No active bookings to checkout.</p> : (
                bookings.map(b => (
                    <div key={b._id} style={cardStyle}>
                        <div>
                            <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{b.customer.name}</h4>
                            <p style={{ margin: 0, color: '#7f8c8d' }}>Room: {b.room.roomNumber} ({b.room.roomType})</p>
                            <p style={{ margin: 0, color: '#7f8c8d' }}>Check-in: {new Date(b.checkIn).toLocaleDateString()}</p>
                        </div>
                        <button 
                            onClick={() => handleCheckout(b._id)} 
                            style={{ padding: '12px 25px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Process Checkout
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Checkout;
