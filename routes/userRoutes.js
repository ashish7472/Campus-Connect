const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get users with similar interests
router.get('/similar/:interests', async (req, res) => {
    const interests = req.params.interests.split(','); // Split interests by comma
    try {
        const users = await User.find({ interests: { $in: interests } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new user (for testing purposes)
router.post('/add', async (req, res) => {
    const { name, interests } = req.body;
    const user = new User({ name, interests });
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
