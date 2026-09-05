import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../api';
import { useNavigate } from 'react-router-dom';

const AvailableRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/rooms/available`);
                setRooms(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    const containerStyle = {
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0 10px',
        marginTop: '20px'
    };

    const thStyle = {
        textAlign: 'left',
        padding: '15px',
        backgroundColor: '#4F6F84',
        color: 'white',
        fontSize: '1.1rem'
    };

    const tdStyle = {
        padding: '15px',
        backgroundColor: 'white',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
    };

    const badgeStyle = (type) => ({
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        backgroundColor: type === 'Suite' ? '#f1c40f' : type === 'Deluxe' ? '#9b59b6' : '#3498db',
        color: 'white'
    });

    return (
        <div style={containerStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: '#4F6F84' }}>Available Rooms</h2>
                <button onClick={() => navigate('/')} style={{ padding: '10px 20px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Back to Dashboard</button>
            </div>
            
            {loading ? <p>Loading rooms...</p> : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={{ ...thStyle, borderTopLeftRadius: '10px' }}>Room Number</th>
                            <th style={thStyle}>Type</th>
                            <th style={thStyle}>Price (per night)</th>
                            <th style={{ ...thStyle, borderTopRightRadius: '10px' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(room => (
                            <tr key={room._id}>
                                <td style={{ ...tdStyle, borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>{room.roomNumber}</td>
                                <td style={tdStyle}>
                                    <span style={badgeStyle(room.roomType)}>{room.roomType}</span>
                                </td>
                                <td style={tdStyle}>${room.price}</td>
                                <td style={{ ...tdStyle, borderTopRightRadius: '10px', borderBottomRightRadius: '10px', color: '#27ae60', fontWeight: 'bold' }}>{room.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {rooms.length === 0 && !loading && <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '1.2rem', color: '#7f8c8d' }}>No rooms currently available.</p>}
        </div>
    );
};

export default AvailableRooms;
