const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 
const notesRoutes = require('./routes/notesRoutes');
require('dotenv').config();

const app = express();

// DB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
