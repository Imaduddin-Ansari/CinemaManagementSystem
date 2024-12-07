require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/employee_routes/dashboardRoutes');
const bookingManagementRoutes = require('./routes/employee_routes/bookingManagementRoutes');
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/user', userRoutes);
app.use('/employee', dashboardRoutes);
app.use('/employee', bookingManagementRoutes);
// Database Connection
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
