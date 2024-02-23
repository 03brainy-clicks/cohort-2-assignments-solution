const express = require("express");
const bodyParser = require("body-parser");
const DBPool = require("./database/DB");
const { todosTableSchema } = require("./database/Schemas");
require("dotenv").config();

// Parsing
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// creating tables
app.use(async (req, res, next) => {
  try {
    const client = await DBPool.connect();
    await client.query(todosTableSchema);
    client.release();
    next();
  } catch (error) {
    console.log(error);
  }
});

// Routes
//show tables
app.get("/tables", (req, res) => {
    const client = DBPool.connect();
    const result = client.query()
});


app.listen(() => {
  console.log(`Server is running on http://localhost:${PGPORT}`);
});
