const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const PORT = 8080;

// connecting database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/admin", adminRouter);
app.use("/user", userRouter);

// server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
