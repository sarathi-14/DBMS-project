const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// @route   POST /api/customers
// @desc    Add a new customer
router.post('/', async (req, res) => {
    try {
        const { name, phone, email, address } = req.body;
        
        // Basic validation
        if (!name || !phone || !email || !address) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const newCustomer = new Customer({ name, phone, email, address });
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/customers
// @desc    Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
