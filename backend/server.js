const express = require('express');
const cors = require('cors');
const {connectDB} = require('../config/db');
const notesRoutes = require('../routes/notesRoutes');
const dotenv = require('dotenv');

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notes',notesRoutes);

app.get('/',(req,res)=>{
    res.send('Server is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,(req,res)=>{
    res.send(`Server is running on ${PORT}`);
});