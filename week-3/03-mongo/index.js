const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");

// Middleware for parsing request bodies
mongoose
  .connect(
    "mongodb+srv://bookstore:nhFsZMLXZdFuGf8Z@cluster0.lq9fplv.mongodb.net/bookstore"
  )
  .then(() => console.log("MongoDB connected"));

const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
