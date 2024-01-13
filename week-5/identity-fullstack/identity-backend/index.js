const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cardsRoutes = require("./routes/identityRoutes");
const app = express();

// Parsing .env file
require("dotenv").config();

// Body parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connecting to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define your routes and middleware here
app.use("/api/cards", cardsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
