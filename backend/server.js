const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS so your live frontend can talk to this backend
app.use(cors());
app.use(express.json());

// A simple test route to make sure it works
app.get('/api/test', (req, res) => {
    res.json({ message: "Backend is working perfectly!" });
});

// CRUCIAL FOR RENDER: Bind dynamically to process.env.PORT and 0.0.0.0
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${PORT}`);
});

