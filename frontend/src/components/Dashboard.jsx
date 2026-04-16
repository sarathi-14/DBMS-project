import React from 'react';
import { Link } from 'react-router-dom';
import hotelLogo from '../assets/hotel_logo.png';

const Dashboard = () => {
    const containerStyle = {
        padding: '50px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh'
    };

    const headerStyle = {
        fontSize: '3rem',
        color: '#4F6F84',
        marginBottom: '40px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '2px'
    };

    const logoStyle = {
        width: '150px',
        marginBottom: '40px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '1000px'
    };

    const buttonStyle = {
        padding: '20px 40px',
        fontSize: '1.2rem',
        backgroundColor: '#4F6F84',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        fontWeight: '500'
    };

    const handleMouseOver = (e) => {
        e.target.style.transform = 'translateY(-5px)';
        e.target.style.backgroundColor = '#3d5a6d';
        e.target.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
    };

    const handleMouseOut = (e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.backgroundColor = '#4F6F84';
        e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    };

    return (
        <div style={containerStyle}>
            <img src={hotelLogo} alt="Hotel Logo" style={logoStyle} />
            <h1 style={headerStyle}>Hotel Management System</h1>
            
            <div style={gridStyle}>
                <Link to="/add-customer" style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    Add Customer
                </Link>
                <Link to="/book-room" style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    Book Room
                </Link>
                <Link to="/available-rooms" style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    Available Rooms
                </Link>
                <Link to="/payment" style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    Payment
                </Link>
                <Link to="/checkout" style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    Checkout
                </Link>
                <Link to="/payment-details" style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    Payment Details
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
