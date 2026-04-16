import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentDetails = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/payments');
                setPayments(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchPayments();
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

    return (
        <div style={containerStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: '#4F6F84' }}>Payment Transactions</h2>
                <button onClick={() => navigate('/')} style={{ padding: '10px 20px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Back to Dashboard</button>
            </div>
            
            {loading ? <p>Loading transactions...</p> : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={{ ...thStyle, borderTopLeftRadius: '10px' }}>Date</th>
                            <th style={thStyle}>Customer</th>
                            <th style={thStyle}>Room</th>
                            <th style={thStyle}>Amount</th>
                            <th style={{ ...thStyle, borderTopRightRadius: '10px' }}>Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(p => (
                            <tr key={p._id}>
                                <td style={{ ...tdStyle, borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>
                                    {new Date(p.paymentDate).toLocaleDateString()}
                                </td>
                                <td style={tdStyle}>{p.booking?.customer?.name || 'N/A'}</td>
                                <td style={tdStyle}>Room {p.booking?.room?.roomNumber || 'N/A'}</td>
                                <td style={{ ...tdStyle, fontWeight: 'bold', color: '#27ae60' }}>${p.amount}</td>
                                <td style={{ ...tdStyle, borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>{p.method}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {payments.length === 0 && !loading && <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '1.2rem', color: '#7f8c8d' }}>No payments recorded yet.</p>}
        </div>
    );
};

export default PaymentDetails;
