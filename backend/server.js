require('dotenv').config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const multer = require("multer");
const accountRoutes = require("./controllers/accountsController");
const incomeRoutes = require("./routes/income");
const eventRoutes = require("./routes/eventroute");
const cropManagementRoutes = require("./routes/croproutes"); 
const authRoutes = require("./routes/auth");
const landRoute = require('./routes/landRoute');


const app = express();

// Connect to the database
connectDB();

// Configure CORS
app.use(cors({ 
  origin: "http://localhost:3000", 
  credentials: true 
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/Accounts/coop/", accountRoutes);
app.use("/api/Accounts/incomePerCrop", incomeRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/crops", cropManagementRoutes);
app.use("/api/lands", landRoute);


const PORT = process.env.PORT || 5000;

// Error handling for unhandled promises
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});