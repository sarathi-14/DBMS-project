import React, { useState } from 'react';
import { API_URL } from '../api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
    const [customer, setCustomer] = useState({ name: '', phone: '', email: '', address: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/customers`, customer);
            setMessage('Customer added successfully!');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setMessage('Error: ' + err.response?.data?.message || err.message);
        }
    };

    const formContainerStyle = {
        maxWidth: '500px',
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

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        backgroundColor: '#4F6F84',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1.1rem',
        fontWeight: 'bold'
    };

    return (
        <div style={formContainerStyle}>
            <h2 style={{ color: '#4F6F84', marginBottom: '20px' }}>Add New Customer</h2>
            {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green', marginBottom: '15px' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input style={inputStyle} type="text" placeholder="Name" onChange={e => setCustomer({...customer, name: e.target.value})} required />
                <input style={inputStyle} type="text" placeholder="Phone" onChange={e => setCustomer({...customer, phone: e.target.value})} required />
                <input style={inputStyle} type="email" placeholder="Email" onChange={e => setCustomer({...customer, email: e.target.value})} required />
                <textarea style={inputStyle} placeholder="Address" rows="3" onChange={e => setCustomer({...customer, address: e.target.value})} required />
                <button type="submit" style={buttonStyle}>Register Customer</button>
            </form>
            <button onClick={() => navigate('/')} style={{ ...buttonStyle, backgroundColor: '#95a5a6', marginTop: '10px' }}>Back to Dashboard</button>
        </div>
    );
};

export default AddCustomer;
