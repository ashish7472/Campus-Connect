// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation
const path = require('path'); // For serving static files

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/campus_connect', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

// Define User Schema with password
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure unique email
    password: { type: String, required: true }, // Password field
    interests: [String],
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Middleware to serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// Define routes

// Signup route with detailed error logging
app.post('/api/signup', async (req, res) => {
    const { name, email, password, rollnumber, branch, year, interests } = req.body;

    // Validate required fields
    if (!name || !email || !password || !rollnumber || !branch || !year) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            rollnumber,
            branch,
            year,
            interests,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
});


// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a token (you can customize the payload and expiration)
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ message: 'Login successful', token, user: { id: user._id, email: user.email, interests: user.interests } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get users with similar interests
app.get('/api/users/similar/:interests', async (req, res) => {
    const interests = req.params.interests.split(',');

    try {
        const similarUsers = await User.find({
            interests: { $in: interests }
        });

        res.json(similarUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Sample route to add a user (for testing purposes)
app.post('/api/users', async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
