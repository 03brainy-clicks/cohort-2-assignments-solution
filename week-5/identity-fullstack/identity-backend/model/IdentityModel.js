const mongoose = require("mongoose");

// Define Identity Schema
const identitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  social: {
    type: Object,
  },
  interest: {
    type: Array,
  },
});

// Identity Model
const Identity = mongoose.model("identity", identitySchema);

module.exports = Identity;
