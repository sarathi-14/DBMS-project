import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookRoom = () => {
    const [customers, setCustomers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [booking, setBooking] = useState({ customerId: '', roomId: '', checkIn: '', checkOut: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const custRes = await axios.get('http://localhost:5000/api/customers');
                const roomRes = await axios.get('http://localhost:5000/api/rooms/available');
                setCustomers(custRes.data);
                setRooms(roomRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/bookings', booking);
            setMessage('Room booked successfully!');
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

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        color: '#4F6F84',
        fontWeight: 'bold'
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ color: '#4F6F84', marginBottom: '20px' }}>Book a Room</h2>
            {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green', marginBottom: '15px' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label style={labelStyle}>Select Customer</label>
                <select style={inputStyle} onChange={e => setBooking({...booking, customerId: e.target.value})} required>
                    <option value="">-- Choose Customer --</option>
                    {customers.map(c => <option key={c._id} value={c._id}>{c.name} ({c.phone})</option>)}
                </select>

                <label style={labelStyle}>Select Room</label>
                <select style={inputStyle} onChange={e => setBooking({...booking, roomId: e.target.value})} required>
                    <option value="">-- Choose Room --</option>
                    {rooms.map(r => <option key={r._id} value={r._id}>{r.roomNumber} - {r.roomType} (${r.price})</option>)}
                </select>

                <label style={labelStyle}>Check-In Date</label>
                <input style={inputStyle} type="date" onChange={e => setBooking({...booking, checkIn: e.target.value})} required />

                <label style={labelStyle}>Check-Out Date</label>
                <input style={inputStyle} type="date" onChange={e => setBooking({...booking, checkOut: e.target.value})} required />

                <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#4F6F84', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}>
                    Confirm Booking
                </button>
            </form>
            <button onClick={() => navigate('/')} style={{ width: '100%', padding: '12px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>
                Cancel
            </button>
        </div>
    );
};

export default BookRoom;
