require('dotenv').config();
const express = require('express');
const cors=require("cors");
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/user_routes/movieRoutes');
const bookingRoutes = require('./routes/user_routes/bookingRoutes');
const reviewRoutes = require('./routes/user_routes//reviewRoutes');
const wishlistRoutes = require('./routes/user_routes//wishlistRoutes');
const cookieParser = require('cookie-parser');
//Employee Routes
const dashboardRoutes = require('./routes/employee_routes/dashboardRoutes');
const bookingManagementRoutes = require('./routes/employee_routes/bookingManagementRoutes');
const customerSupportRoutes = require('./routes/employee_routes/customerSupportRoutes');
const shiftRoutes = require('./routes/employee_routes/shiftRoutes');


const app = express();
app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(bodyParser.json());

// Routes User
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Routes Employee
app.use('/employee', dashboardRoutes);
app.use('/employee', bookingManagementRoutes);
app.use('/api/customer-support', customerSupportRoutes);
app.use('/api/shift-management', shiftRoutes);

// Database Connection
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));