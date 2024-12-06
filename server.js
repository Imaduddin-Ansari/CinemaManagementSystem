const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected!"))
.catch((err) => console.error(err));

// Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/shows', require('./routes/showRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));




// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
